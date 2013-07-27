class TwitterUser < ActiveRecord::Base

  ###-------------------------------------------------------------------------------
  # Initializers
  ###-------------------------------------------------------------------------------
  attr_accessible :description, :location, :name, :profile_image_url, :protected, :screen_name, :user_id, :user_id_str, :utc_offset

  ###-------------------------------------------------------------------------------
  # Relationships
  ###-------------------------------------------------------------------------------
  has_many :tweets
  has_many :statements

  ###-------------------------------------------------------------------------------
  # Validations
  ###-------------------------------------------------------------------------------

  ###-------------------------------------------------------------------------------
  # Public Methods
  ###-------------------------------------------------------------------------------

  def self.store_user(u)
    TwitterUser.create(
        :description => u.description,
        :location => u.location,
        :name => u.name,
        :profile_image_url => u.profile_image_url,
        :protected => u.protected,
        :screen_name => u.screen_name,
        :user_id => u.id,
        :utc_offset => u.utc_offset
    )
  end

  def create_manifesto

  end
end
