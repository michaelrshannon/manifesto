require "#{Rails.root}/lib/classes/heroku_resque_auto_scale.rb"

class LoadTweets
  extend HerokuResqueAutoScale if %w(staging uat production).include?(Rails.env)

  @queue = :tweets

  def self.perform(mention)
    # mention may have been passed as a model, but it comes through as a hash.
    Tweet.update_tweets(mention["screen_name"])
    user = TwitterUser.find_by_screen_name(mention["screen_name"])
    statement = Statement.store_statement(user, mention)

    # Allow tweets from staging for now as there is no "production"
    if Rails.env.production? || Rails.env.staging?
      statement.send_to_user
    end
  end
end