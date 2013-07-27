class AddTemperatureToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :weather, :text
  end
end

