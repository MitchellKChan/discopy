class CreateMessagesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :messages_tables do |t|
      t.references :author, null: false, foreign_key: {to_table: :users }
      t.string :body, null: false
      t.references :sendable, polymorphic: true
      t.timestamps
    end
  end
end
