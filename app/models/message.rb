# == Schema Information
#
# Table name: messages
#
#  id                :bigint           not null, primary key
#  body              :string           not null
#  parent_message_id :bigint
#  author_id         :bigint           not null
#  sendable_type     :string           not null
#  sendable_id       :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Message < ApplicationRecord
    validates :body, :author_id, :sendable_id, :sendable_type, presence: true
    
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :sendable,
        polymorphic: true
end
