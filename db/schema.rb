# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130728115520) do

  create_table "mentions", :force => true do |t|
    t.integer  "mention_id"
    t.string   "screen_name"
    t.datetime "mention_created_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "statements", :force => true do |t|
    t.string   "fragment1"
    t.string   "fragment2"
    t.string   "fragment3"
    t.string   "fragment4"
    t.string   "screen_name"
    t.string   "picture_url"
    t.integer  "twitter_user_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "first_tweet"
    t.integer  "second_tweet"
  end

  create_table "tweets", :force => true do |t|
    t.string   "tweet_id_str"
    t.text     "text"
    t.string   "source"
    t.boolean  "truncated"
    t.datetime "tweet_created_at"
    t.string   "in_reply_to_screen_name"
    t.integer  "twitter_user_id"
    t.integer  "retweet_count"
    t.integer  "favourite_count"
    t.text     "coordinates"
    t.text     "hashtags"
    t.text     "urls"
    t.text     "user_mentions"
    t.text     "symbols"
    t.text     "media"
    t.boolean  "favourited"
    t.boolean  "retweeted"
    t.datetime "created_at",                           :null => false
    t.datetime "updated_at",                           :null => false
    t.integer  "tweet_id",                :limit => 8
    t.integer  "in_reply_to_status_id",   :limit => 8
    t.integer  "in_reply_to_user_id",     :limit => 8
    t.string   "address"
    t.string   "country"
    t.string   "country_code"
    t.float    "latitude"
    t.float    "longitude"
    t.text     "weather"
  end

  add_index "tweets", ["tweet_id"], :name => "index_tweets_on_tweet_id", :unique => true
  add_index "tweets", ["twitter_user_id"], :name => "index_tweets_on_twitter_user_id"

  create_table "twitter_users", :force => true do |t|
    t.string   "name"
    t.string   "screen_name"
    t.string   "location"
    t.string   "description"
    t.boolean  "protected"
    t.integer  "utc_offset"
    t.string   "profile_image_url"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.integer  "user_id",           :limit => 8
  end

  add_index "twitter_users", ["user_id"], :name => "index_twitter_users_on_user_id", :unique => true

end
