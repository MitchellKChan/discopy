class CreateJoinedServers < ActiveRecord::Migration[7.0]
  def change
    create_table :joined_servers do |t|
      t.references :server, null: false, foreign_key: true
      t.references :member, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
    add_index :joined_servers, [:server_id, :member_id], unique: true
  end
end
