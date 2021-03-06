#b1e79e5d50c8d654

class Tweet < ActiveRecord::Base

  ###-------------------------------------------------------------------------------
  # Initializers
  ###-------------------------------------------------------------------------------
  attr_accessible :coordinates, :tweet_created_at, :entities, :favourite_count, :favourited,
                  :in_reply_to_screen_name, :in_reply_to_status_id, :in_reply_to_user_id,
                  :retweet_count, :retweeted, :source, :text, :truncated, :tweet_id, :tweet_id_str, :hashtags,
                  :urls, :user_mentions, :media, :latitude, :longitude, :weather

  serialize :coordinates
  serialize :media
  serialize :hashtags
  serialize :urls
  serialize :user_mentions
  serialize :weather

  default_scope order('tweet_created_at DESC')

  SEARCH_REGEX = /(((when we)|(it's not)|(i'm)|(i was)|(that it)|(if we)|(you can)|(when we)|(for the)|(love the)|(until you)|(i just)|(i spent)|(that will)|(i also)|(all our)|(that some)|(if we))[\s][A-z @#]*[A-z]+)/i
  SEARCH_REGEX_STRING = SEARCH_REGEX.source
=begin
  reverse_geocoded_by :latitude, :longitude do |obj, results|
    if geo = results.first
      obj.address    = geo.city
      obj.country = geo.country == 'United Kingdom' ? 'UK' : geo.country
      obj.country_code = geo.country_code
    end
  end
=end

  @@client = Twitter::Client.new(
      :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
      :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'],
      :oauth_token => ENV['TWITTER_OAUTH_TOKEN'],
      :oauth_token_secret => ENV['TWITTER_TOKEN_SECRET']
  )

#  after_validation :reverse_geocode#, :if => lambda{ |obj| obj.address_changed? }
###-------------------------------------------------------------------------------
# Relationships
###-------------------------------------------------------------------------------
  belongs_to :twitter_user
###-------------------------------------------------------------------------------
# Validations
###-------------------------------------------------------------------------------
  validates :tweet_id, :uniqueness => true
###-------------------------------------------------------------------------------
# Public Methods
###-------------------------------------------------------------------------------

  def self.store_tweet(t)
    unless Tweet.find_by_tweet_id(t.id)
      twitter_user = TwitterUser.find_by_user_id(t.user.id)
      # Create user if doesn't exist
      unless twitter_user
        twitter_user = TwitterUser.store_user(t.user)
      end
      coordinates = t.geo ? t.geo.coordinates : nil
      latitude = coordinates.is_a?(Array) ? coordinates[0] : nil
      longitude = coordinates.is_a?(Array) ? coordinates[1] : nil
      media = t.media ? t.media : nil
      twitter_user.tweets.create(
          :coordinates => coordinates,
          :tweet_created_at => t.created_at,
          :hashtags => t.hashtags,
          :urls => t.urls,
          :user_mentions => t.user_mentions,
          :media => media,
          :favourite_count => t.favourite_count,
          :favourited => t.favourited,
          :in_reply_to_screen_name => t.in_reply_to_screen_name,
          :in_reply_to_status_id => t.in_reply_to_status_id,
          :in_reply_to_user_id => t.in_reply_to_user_id,
          :retweet_count => t.retweet_count,
          :retweeted => t.retweeted,
          :source => t.source,
          :text => t.text,
          :truncated => t.truncated,
          :tweet_id => t.id,
          :tweet_id_str => t.id.to_s,
          :latitude => latitude,
          :longitude => longitude
      )
    end
  end

  # Stores the last time an update was attempted in ENV['LAST_UPDATE'], and will pull in
  # new tweets if 5 minutes has passed since last update
  def self.update_tweets(username)
    unless TwitterUser.find_by_screen_name(username)
      (1..3).each do |page|
        begin
          tweets = @@client.user_timeline(username, count: 200, page: page)
          break unless tweets.any?
          tweets.each do |tweet|
            Tweet.store_tweet(tweet) unless tweet.retweeted_status
          end
        rescue Twitter::Error::TooManyRequests
          logger.debug 'TWITTER EXCEPTION RESCUED :: API Rate limit exceeded in Tweet::update_tweets'
        end
      end
    end

  end

  def self.find_all_with_coordinates(extra_query='')
    extra_query = extra_query != '' ? " AND #{extra_query}" : ''
    Tweet.where("coordinates NOT LIKE '--- \n...\n'#{extra_query}")
  end

  def self.find_all_by_hashtag(hashtag)
    with_hashtag = []
    find_all_with_coordinates("hashtags NOT LIKE '--- []\n'").each do |tweet|
      if tweet.hashtags.any?
        tweet.hashtags.each do |ht|
          if ht.text == hashtag
            with_hashtag << tweet
            break
          end
        end
      end
    end
    with_hashtag
  end

  def self.find_all_with_media
    find_all_with_coordinates("media NOT LIKE '--- []\n'")
  end

  private
  def self.get_weather(lat, lon, time)
    url = "https://api.forecast.io/forecast/#{ENV['FORECAST_IO_API_KEY']}/#{lat},#{lon},#{time.to_i}?units=uk"
    JSON.parse(HTTParty.get(url).body)
  end

  def weather_by_tweet_hour
    if weather && weather['hourly'] && weather['hourly']['data']
      weather['hourly']['data'][tweet_created_at.hour] || nil
    else nil
    end
  end
end