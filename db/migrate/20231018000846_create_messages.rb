class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.references :parent_message, foreign_key: { to_table: :messages}
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :sendable, null: false, polymorphic: true

      t.timestamps
    end
  end
end
