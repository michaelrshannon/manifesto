module HomeHelper

  def formatted_tweet_text(tweet)
    if tweet.hashtags.any?
      string = ''
      tweet.hashtags.each_with_index do |ht, i|
        last_position = i == 0 ? 0 : tweet.hashtags[i-1].indices[1]
        string = string + tweet.text[last_position..ht.indices[0] - 1] + link_to("##{ht.text}", "?hashtag=#{ht.text}", :data => {:remote => true}, :class => 'hashtag', :data => {:title => "Show tweets with ##{ht.text}", :remote => true})
        if i >= tweet.hashtags.size - 1
          string = string + tweet.text[ht.indices[1]..-1]
        end
      end
      string.html_safe

    else #No hashtags present, so simply return tweet text
      tweet.text
    end
  end
end
