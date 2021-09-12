class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :user
      t.references :shop
      t.string :title, null: false
      t.float :rate, null: false
      t.text :text
      t.timestamps
    end
  end
end
