class CreateStatements < ActiveRecord::Migration
  def change
    create_table :statements do |t|
      t.string :fragment1
      t.string :fragment2
      t.string :fragment3
      t.string :fragment4
      t.string :first_tweet
      t.string :second_tweet
      t.string :screen_name
      t.string :picture_url
      t.integer :twitter_user_id

      t.timestamps
    end
  end
end
