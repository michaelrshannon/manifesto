class Statement < ActiveRecord::Base
  attr_accessible :first_tweet, :fragment1, :fragment2, :fragment3, :fragment4, :picture_url, :screen_name, :second_tweet

  ###-------------------------------------------------------------------------------
  # Initializers
  ###-------------------------------------------------------------------------------
=begin
  TEMPLATES = [
      { first: 'I believe', second: 'but' },
      { first: 'I believe that', second: 'but' },
      { first: 'I had a dream', second: 'and' },
      { first: 'I had a dream', second: 'and I want' },
      { first: 'I had a dream', second: 'and we became' },
      { first: 'We will destroy', second: 'and conquer' },
      { first: 'We must accept', second: 'so' },
      { first: 'We must unite', second: 'to conquer' },
      { first: 'We stand for independence', second: 'but' },
      #{ first: 'I can\'t believe', second: 'that' },
      { first: 'I will crush', second: 'and' },
      { first: 'Victory will be ours', second: 'and' },
      { first: 'The truth is', second: 'but' },
      { first: 'To be honest', second: 'I\'ve learnt that' },
      { first: 'I long for the day', second: 'and you' }
  ]
=end

  TEMPLATES = [
      { first: 'I believe', second: 'but' },
      { first: 'I believe that', second: 'but' },
      { first: 'I had a dream', second: 'and' },
      { first: 'I long for the day', second: 'and' },
      { first: 'I promise', second: 'and' },
      { first: 'Let us', second: 'and' },
      { first: 'The truth is', second: 'but' },
      { first: 'To be honest', second: 'and' },
      { first: 'Victory will be ours', second: 'and' },
      { first: 'We have the power', second: 'and' },
      { first: 'We must', second: 'and' },
      { first: 'We must accept', second: 'so' },
      { first: 'We must believe', second: 'so' },
      { first: 'We will destroy', second: 'and conquer' },
      { first: 'We must unite', second: 'to defeat' },
      { first: 'We must unite', second: 'to conquer' },
      { first: 'We will crush', second: 'and' },
  ]

  FINDERS = [
      'when we',
      'it\'s not',
      'i\'m',
      'i was',
      'that it',
      'if we',
      'you can',
      'when we',
      'for the',
      'love the',
      'until you',
      'i just',
      'i spent',
      'that will',
      'i also',
      'all our',
      'that some',
      'if we'
  ]
  SORTED_FINDERS = {
      'I believe' =>
          [ 'I did',
            'we can',
            'you were'],
      'I believe that' =>
          [ 'I\'m not',
            'I\'ve got',
            'you can\'t',
            'you can\'t',
            'it\'s not',
            'it\'s'
          ],
      'I had a dream' =>
          [ 'I spent',
            'I just',
            'that I',
            'we went',
            'that we',
            'we went'
          ],
      'I long for the day' =>
          [ 'when we' ],
      'I promise' =>
          [ 'we can' ],
      'Let us' =>
          [ 'make' ],
      'The truth is' =>
          [ 'I was' ],
      'To be honest' =>
          [ 'I think' ],
      'Victory will be ours' =>
          [ 'If we' ],
      'We have the power' =>
          [ 'to do',
            'to make',
            'to start',
            'that will'
          ],
      'We must' =>
          [ 'love the' ],

      'We must accept' =>
          [ 'that it' ],

      'We must believe' =>
          [ 'that the',
            'in the'
          ],
      'We must destroy' =>
          [ 'when we',
            'all the',
            'your'
          ],
      'We must unite' =>
          [ 'over',
            'if we are',
            'if we',
            'if we',
          ],
      'We will crush' =>
          [ 'those' ]
  }
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

    found = false; i = 0
    until found || i > 30
      random_template = TEMPLATES[r.rand(0..(TEMPLATES.size - 1))]
      finders_array = SORTED_FINDERS[random_template[:first]] ? SORTED_FINDERS[random_template[:first]] : FINDERS

      string = ''
      finders_array.collect { |f| string += "#{f}|" }
      string = string[0..-2]

      search_regex = /((when we|it's not|i'm|i was|that it|if we|you can|when we|for the|love the|until you|i just|i spent|that will|i also|all our|that some|if we)[\s][A-z @#'\/]*[A-z]+)/i

      reg = Regexp.new("((#{string})[\s][A-z @'/]*[A-z]+)", Regexp::IGNORECASE)
      first_partial = user.tweets.where('"tweets"."text" ~* ?', reg.source).collect {|t| {:id => t.id, :text => t.text[reg]}}
      if first_partial.any?
        found = true
      else
        i += 1
      end
      second_partial = user.tweets.where('"tweets"."text" ~* ?', search_regex.source).collect {|t| {:id => t.id, :text => t.text[search_regex]}}
    end

    if found

      first_tweet = first_partial[r.rand(0..(first_partial.size - 1))]
      first_partial.delete_if {|r| r[:text][/I'm at/]}
      second_partial.delete_if {|r| r[:text][/I'm at/]}
      unique = false
      until unique
        second_tweet = second_partial[r.rand(0..(second_partial.size - 1))]
        unique = true unless second_tweet == first_tweet
      end

      [first_tweet, second_tweet].each do |tweet|
        tweet[:text] = tweet[:text].gsub('@', '')
        tweet[:text] = tweet[:text].gsub(' RT ', '')
        tweet[:text] = tweet[:text].gsub(' rt ', '')
        tweet[:text] = tweet[:text].gsub('http', '')
      end

      user.statements.create(
          fragment1: random_template[:first],
          fragment2: first_tweet[:text],
          fragment3: random_template[:second],
          fragment4: second_tweet[:text],
          picture_url: user.profile_image_url.gsub('_normal', '_bigger'),
          screen_name: user.screen_name,
          first_tweet: first_tweet[:id],
          second_tweet: second_tweet[:id]
      )

    else
      user.statements.create(
          fragment1: nil,
          fragment2: nil,
          fragment3: nil,
          fragment4: nil,
          picture_url: user.profile_image_url,
          screen_name: user.screen_name,
          first_tweet: nil,
          second_tweet: nil
      )
    end
  end

  def to_s
    "#{fragment1} #{fragment2} #{fragment3} #{fragment4}"
  end

  def as_json(*args)

    if fragment1 && fragment2 && fragment3 && fragment4
      tweet1 = Tweet.find(first_tweet)
      tweet2 = Tweet.find(first_tweet)
      fragments = [
          fragment1,
          fragment2,
          fragment3,
          fragment4
      ]
      tweets =  [
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
      ]
    else
      fragments = nil
      tweets = nil
    end
    {
        :id => id,
        :date => created_at,
        :tweets => tweets,
        :fragments => fragments,
        :user =>
            {
                :screen_name => screen_name,
                :name => TwitterUser.find_by_screen_name(screen_name).name,
                :image => picture_url,
            }
    }
  end

  def self.mass_generate(user)
    (0..40).each do |i|
      Statement.store_statement(user)
    end
  end
end

#(((when we)|(it's not)|(i'm)|(i was))[A-z ]*[^?])((\btest)[^?]|(\bwave)[^?])