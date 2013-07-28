class Mention < ActiveRecord::Base
  attr_accessible :mention_created_at, :mention_id, :screen_name

  validates :mention_created_at, :mention_id, :screen_name, :presence => true

  def self.build_from_api(mention)
    Mention.create(
        mention_id: mention.id,
        screen_name: mention.user.screen_name,
        mention_created_at: mention.created_at
    )
  end
end