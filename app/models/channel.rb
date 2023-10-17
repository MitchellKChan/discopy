# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    validates :name, presence: true

    belongs_to :server
end