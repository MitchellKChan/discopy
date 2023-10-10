class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :display_name
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :phone_number
      t.string :avatar
      t.string :about_me
      t.string :status, null: false
      t.string :custom_status

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
