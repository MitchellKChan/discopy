class AddConstraintsToServersPublic < ActiveRecord::Migration[7.0]
  def change
    change_column :servers, :public, :boolean, null: false, default: false
  end
end
