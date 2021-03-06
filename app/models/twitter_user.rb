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
  has_many :tweets, :dependent => :destroy
  has_many :statements, :dependent => :destroy

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
    if !ENV['LAST_UPDATE'] || (Time.now > Time.parse(ENV['LAST_UPDATE']) + 45.seconds)
      begin
        @@client.mentions_timeline.each do |mention|
          unless Mention.find_by_mention_id(mention.id) || mention.user.screen_name == 'mashifesto'
            our_mention = Mention.build_from_api(mention)
            Resque.enqueue(LoadTweets, our_mention)
          end
        end
      rescue Twitter::Error::TooManyRequests
        logger.debug 'TWITTER EXCEPTION RESCUED :: API Rate limit exceeded in TwitterUser::check_mentions'
      rescue ActiveRecord::StatementInvalid => e
        logger.debug "ACTIVE RECORD EXCEPTION RESCUED :: Could be that we\'ve hit a DB limit on Heroku :: #{e.message}"
      end
      ENV['LAST_UPDATE'] = Time.now.to_s
    end
  end
end
