class AddAncestryToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :ancestry, :string
    add_index :areas, :ancestry
  end
end
