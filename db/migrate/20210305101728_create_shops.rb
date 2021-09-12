class CreateShops < ActiveRecord::Migration[6.1]
  def change
    create_table :shops do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :phone_number
      t.references :area, null: false
      t.string :image1, null: false
      t.string :image2
      t.string :image3
      t.string :image4
      t.string :image5
      t.timestamps
    end
  end
end
