class TwitterUser < ActiveRecord::Base

  ###-------------------------------------------------------------------------------
  # Initializers
  ###-------------------------------------------------------------------------------
  attr_accessible :description, :location, :name, :profile_image_url, :protected, :screen_name, :user_id, :user_id_str, :utc_offset
  @@client = Twitter::Client.new(
      :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
      :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'],
      :oauth_token => ENV['TWITTER_OAUTH_TOKEN'],
      :oauth_token_secret => ENV['TWITTER_TOKEN_SECRET']
  )
  ###-------------------------------------------------------------------------------
  # Relationships
  ###-------------------------------------------------------------------------------
  has_many :tweets
  has_many :statements

  ###-------------------------------------------------------------------------------
  # Validations
  ###-------------------------------------------------------------------------------

  ###-------------------------------------------------------------------------------
  # Public Methods
  ###-------------------------------------------------------------------------------

  def self.store_user(u)
    TwitterUser.create(
        :description => u.description,
        :location => u.location,
        :name => u.name,
        :profile_image_url => u.profile_image_url,
        :protected => u.protected,
        :screen_name => u.screen_name,
        :user_id => u.id,
        :utc_offset => u.utc_offset
    )
  end

  def self.check_mentions
    @@client.mentions_timeline.each do |mention|
      screen_name = mention.user.screen_name
      unless TwitterUser.find_by_screen_name(screen_name)
        Resque.enqueue(LoadTweets, screen_name)
      end

    end
  end
end
