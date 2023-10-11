# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  display_name    :string
#  password_digest :string           not null
#  session_token   :string           not null
#  phone_number    :string
#  avatar          :string
#  about_me        :string
#  status          :string           not null
#  custom_status   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

# regex reference: https://stackoverflow.com/questions/6960596/example-of-a-regular-expression-for-phone-numbers
PHONE_NUMBER_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

class User < ApplicationRecord
  # this handles password getter, setter, and is_password? for us
  has_secure_password 

  before_validation :ensure_session_token

  validates :email, :username, :session_token, :status, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :email, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, 
    length: { in: 2..32 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  # validates :display_name,
  #   length: { in: 1..32 },
  #   allow_nil: true
  validates :password,
    length: { minimum: 8 },
    allow_nil: true
  validates :phone_number,
    # uniqueness validated here to allow multiple users to not have a phone number
    uniqueness: true,
    format: { with: PHONE_NUMBER_REGEX, message: "must be a phone number" },
    allow_nil: true
  validates :status,
    inclusion: ["Online", "Offline", "Idle", "Do Not Disturb", "Invisible"]

  has_many :servers,
    foreign_key: :creator_id,
    class_name: :Server,
    inverse_of: :creator,
    dependent: :destroy

  has_many :joined_servers,
    foreign_key: :member_id,
    class_name: :JoinedServer,
    inverse_of: :member,
    dependent: :destroy

  def self.find_by_credentials(credential, password)
    # determine the field you need to query: 
    #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
    #   * `phone_number` if `credential` matches `User.PHONE_NUMBER_REGEX`
    # find the user whose email/phone_number is equal to `credential`
    if credential.match(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    elsif credential.match(PHONE_NUMBER_REGEX)
      user = User.find_by(phone_number: credential)
    end

    # if no such user exists, return a falsey value
    # if a matching user exists, use `authenticate` to check the provided password
    # return the user if the password is correct, otherwise return a falsey value
    user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    # `update!` the user's session token to a new, random token
    # return the new session token, for convenience
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end 

  private

  def ensure_session_token
    # if `self.session_token` is already present, leave it be
    # if `self.session_token` is nil, set it to `generate_unique_session_token`
    self.session_token ||= generate_unique_session_token
  end

  def generate_unique_session_token
    # in a loop:
      # use SecureRandom.base64 to generate a random token
      # use `User.exists?` to check if this `session_token` is already in use
      # if already in use, continue the loop, generating a new token
      # if not in use, return the token
    while true
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end
  end
  
end
