# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  public     :boolean          default(FALSE), not null
#  creator_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
    validates :name, :creator_id, presence: true
    validates :public, inclusion: [true, false]

    belongs_to :creator,
        foreign_key: :creator_id,
        class_name: :User

    has_many :channels,
        dependent: :destroy

    has_many :joined_servers,
        dependent: :destroy

    has_many :members,
        through: :joined_servers,
        source: :member,
        dependent: :destroy
end
