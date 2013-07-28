class AddMentionIdBigIntToMentions < ActiveRecord::Migration
  def change
    remove_column :mentions, :mention_id
    add_column :mentions, :mention_id, :bigint
  end
end
