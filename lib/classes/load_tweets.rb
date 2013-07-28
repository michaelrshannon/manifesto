require "#{Rails.root}/lib/classes/heroku_resque_auto_scale.rb"

class LoadTweets
  extend HerokuResqueAutoScale if %w(staging uat production).include?(Rails.env)

  @queue = :tweets

  def self.perform(screen_name)
    Tweet.update_tweets(screen_name)
    user = TwitterUser.find_by_screen_name(screen_name)
    Statement.self.store_statement(user)
  end
end