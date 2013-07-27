class CreateTwitterUsers < ActiveRecord::Migration
  def change
    create_table :twitter_users do |t|
      t.string :name
      t.string :screen_name
      t.string :location
      t.string :description
      t.boolean :protected
      t.integer :utc_offset
      t.string :profile_image_url

      t.timestamps
    end

    add_column :twitter_users, :user_id, :bigint

    add_index :twitter_users, :user_id, :unique => true
  end
end
