class CreateMentions < ActiveRecord::Migration
  def change
    create_table :mentions do |t|
      t.integer :mention_id
      t.string :screen_name
      t.datetime :mention_created_at

      t.timestamps
    end
  end
end
