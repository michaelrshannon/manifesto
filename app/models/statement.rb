class Statement < ActiveRecord::Base
  attr_accessible :first_tweet, :fragment1, :fragment2, :fragment3, :fragment4, :picture_url, :screen_name, :second_tweet

  ###-------------------------------------------------------------------------------
  # Initializers
  ###-------------------------------------------------------------------------------
  TEMPLATES = [
      { first: 'I believe that', second: 'but' },
      { first: 'I had a dream', second: 'and' },
      { first: 'I had a dream', second: 'and I want' },
      { first: 'I had a dream', second: 'and we became' },
      { first: 'We will destroy', second: 'and conquer' },
      { first: 'We must accept', second: 'so' },
      { first: 'We must unite', second: 'to conquer' },
      { first: 'We stand for independence', second: 'but' },
      { first: 'I can\'t believe', second: 'that' },
      { first: 'I will crush', second: 'and' },
      { first: 'Victory will be ours', second: 'and' },
      { first: 'The truth is', second: 'but' },
      { first: 'To be honest', second: 'I\'ve learnt that' },
  ]
  SEARCH_REGEX = /(((when we)|(it's not)|(i'm)|(i was)|(that it)|(if we)|(you can)|(when we)|(for the)|(love the)|(until you)|(i just)|(i spent)|(that will)|(i also)|(all our)|(that some)|(if we))[\s][A-z @#'\/]*[A-z]+)/i
  SEARCH_REGEX_STRING = SEARCH_REGEX.source
  ###-------------------------------------------------------------------------------
  # Relationships
  ###-------------------------------------------------------------------------------
  belongs_to :twitter_user

  ###-------------------------------------------------------------------------------
  # Validations
  ###-------------------------------------------------------------------------------

  ###-------------------------------------------------------------------------------
  # Public Methods
  ###-------------------------------------------------------------------------------
  def self.store_statement(user)
    r = Random.new()
    partials = user.tweets.where('"tweets"."text" ~* ?', SEARCH_REGEX_STRING).collect {|t| {:id => t.id, :text => t.text[SEARCH_REGEX]}}
    random_template = TEMPLATES[r.rand(0..(TEMPLATES.size - 1))]
    first_tweet = partials[r.rand(0..(partials.size - 1))]
    unique = false
    until unique
      second_tweet = partials[r.rand(0..(partials.size - 1))]
      unique = true unless second_tweet == first_tweet
    end

    user.statements.create(
        fragment1: random_template[:first],
        fragment2: first_tweet[:text],
        fragment3: random_template[:second],
        fragment4: second_tweet[:text],
        picture_url: user.profile_image_url,
        screen_name: user.screen_name,
        first_tweet: first_tweet[:id],
        second_tweet: second_tweet[:id]
    )
  end

  def to_s
    "#{fragment1} #{fragment2} #{fragment3} #{fragment4}"
  end

  def as_json(*args)
    tweet1 = Tweet.find(first_tweet)
    tweet2 = Tweet.find(first_tweet)

     {
        :id => id,
        :date => created_at,
        :tweets =>
            [
                {
                    :url => "https://twitter.com/#{screen_name}/status/#{tweet1.tweet_id_str}",
                    :text => tweet1.text,
                    :location =>
                        {
                            :lng => tweet1.longitude,
                            :lat => tweet1.latitude
                        }
                },
                {
                    :url => "https://twitter.com/#{screen_name}/status/#{tweet2.tweet_id_str}",
                    :text => tweet2.text,
                    :location =>
                        {
                            :lng => tweet2.longitude,
                            :lat => tweet2.latitude,
                        }
                }
            ],
        :fragments =>
            [
               fragment1,
                fragment2,
                fragment3,
                fragment4
            ],
        :user =>
            {
                :screen_name => screen_name,
                :name => TwitterUser.find_by_screen_name(screen_name).name,
                :image => picture_url,
            }
    }
  end
end

#(((when we)|(it's not)|(i'm)|(i was))[A-z ]*[^?])((\btest)[^?]|(\bwave)[^?])