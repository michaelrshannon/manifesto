class AddMentionIdToStatement < ActiveRecord::Migration
  def change
    add_column :statements, :mention_id, :int
  end
end
