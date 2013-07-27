class ChangeTweetTypeToIntegerOnStatements < ActiveRecord::Migration
  def up
    remove_column :statements, :first_tweet
    remove_column :statements, :second_tweet
    add_column :statements, :first_tweet, :integer
    add_column :statements, :second_tweet, :integer
  end

  def down
  end
end
