class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.boolean :public
      t.references :creator, null: false, index: true, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
