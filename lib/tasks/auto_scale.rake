desc 'This task is called by the Heroku scheduler add-on to handle scaling of resque dynos'
task :scale_dynos => :environment do
  HerokuResqueAutoScale.scale
end
