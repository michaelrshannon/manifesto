require 'heroku-api'

###
# When triggered, examines the current queue size, and automatically handles scaling of workers. When the queue is empty, any resque
# processes will be shut down again.
module HerokuResqueAutoScale
  module Scaler # :nodoc:
    class << self
      @@heroku = Heroku::API.new(:api_key => ENV['HEROKU_API_KEY'])
      @@app = ENV['HEROKU_APP_NAME']

      def workers
        processes = @@heroku.get_ps(@@app).body
        resque_count = 0
        processes.each do |ps|
          resque_count += 1 if ps['process'].split('.')[0] == 'resque'
        end
        resque_count
      end

      def workers=(qty)
        @@heroku.post_ps_scale(@@app, 'resque', qty)
      end

      def job_count
        Resque.info[:pending].to_i
      end
    end
  end

  def self.scale(args = {:min_job_count => 1})
    unless Rails.env == 'development'
      Scaler.workers = 0 if Scaler.job_count.zero? && Scaler.job_count < args[:min_job_count]
      [
          {
              :workers => 1, # This many workers
              :job_count => 1 # For this many jobs or more, until the next level
          },
          {
              :workers => 2,
              :job_count => 15
          },
          {
              :workers => 3,
              :job_count => 25
          },
          {
              :workers => 4,
              :job_count => 40
          },
          {
              :workers => 5,
              :job_count => 60
          }
      ].reverse_each do |scale_info|
        # Run backwards so it gets set to the highest value first
        # Otherwise if there were 70 jobs, it would get set to 1, then 2, then 3, etc

        # If we have a job count greater than or equal to the job limit for this scale info
        if Scaler.job_count >= scale_info[:job_count]
          # Set the number of workers unless they are already set to a level we want. Don't scale down here!
          if Scaler.workers <= scale_info[:workers]
            Scaler.workers = scale_info[:workers]
          end
          break # We've set or ensured that the worker count is high enough
        end
      end
    end
  end
end
