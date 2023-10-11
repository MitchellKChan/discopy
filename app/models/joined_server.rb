# == Schema Information
#
# Table name: joined_servers
#
#  id         :bigint           not null, primary key
#  server_id  :bigint           not null
#  member_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class JoinedServer < ApplicationRecord
    validates :server_id, :member_id, presence: true
    validates :server_id, uniqueness: {
        scope: :member_id,
        message: "members can only join a server once"
    }

    belongs_to :server
    
    belongs_to :member,
        foreign_key: :member_id,
        class_name: :User
end
