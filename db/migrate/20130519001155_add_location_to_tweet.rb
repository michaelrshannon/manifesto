class AddLocationToTweet < ActiveRecord::Migration
  def change
    add_column :tweets, :address, :string
    add_column :tweets, :country, :string
    add_column :tweets, :country_code, :string
    add_column :tweets, :latitude, :float
    add_column :tweets, :longitude, :float
  end
end
