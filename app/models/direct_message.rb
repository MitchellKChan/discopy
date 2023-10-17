# == Schema Information
#
# Table name: direct_messages
#
#  id             :bigint           not null, primary key
#  first_user_id  :bigint           not null
#  second_user_id :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class DirectMessage < ApplicationRecord
    validates :first_user_id, :second_user_id, presence: true
    validates :first_user_id, uniqueness: {
        scope: :second_user_id,
        message: "two users can only have one direct message thread between them"
    }
    validates :second_user_id, uniqueness: {
        scope: :first_user_id,
        message: "two users can only have one direct message thread between them"
    }

    belongs_to :first_user,
        foreign_key: :first_user_id,
        class_name: :User

    belongs_to :second_user,
        foreign_key: :second_user_id,
        class_name: :User
end
