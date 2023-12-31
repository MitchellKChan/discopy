# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_18_000846) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "joined_servers", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.bigint "member_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_joined_servers_on_member_id"
    t.index ["server_id", "member_id"], name: "index_joined_servers_on_server_id_and_member_id", unique: true
    t.index ["server_id"], name: "index_joined_servers_on_server_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "parent_message_id"
    t.bigint "author_id", null: false
    t.string "sendable_type", null: false
    t.bigint "sendable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["parent_message_id"], name: "index_messages_on_parent_message_id"
    t.index ["sendable_type", "sendable_id"], name: "index_messages_on_sendable"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "public", default: false, null: false
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_servers_on_creator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "display_name"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "phone_number"
    t.string "avatar"
    t.string "about_me"
    t.string "status", null: false
    t.string "custom_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channels", "servers"
  add_foreign_key "joined_servers", "servers"
  add_foreign_key "joined_servers", "users", column: "member_id"
  add_foreign_key "messages", "messages", column: "parent_message_id"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "servers", "users", column: "creator_id"
end
