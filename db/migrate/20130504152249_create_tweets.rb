class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :tweet_id_str
      t.string :text
      t.string :source
      t.boolean :truncated
      t.datetime :tweet_created_at
      t.string :in_reply_to_screen_name
      t.integer :twitter_user_id
      t.integer :retweet_count
      t.integer :favourite_count
      t.text :coordinates
      t.text :hashtags
      t.text :urls
      t.text :user_mentions
      t.text :symbols
      t.text :media
      t.boolean :favourited
      t.boolean :retweeted

      t.timestamps
    end

    add_column :tweets, :tweet_id, :bigint
    add_column :tweets, :in_reply_to_status_id, :bigint
    add_column :tweets, :in_reply_to_user_id, :bigint

    add_index :tweets, :tweet_id, :unique => true
    add_index :tweets, :twitter_user_id
  end
end