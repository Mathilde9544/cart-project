class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.integer :number
      t.references :cart, null: false, foreign_key: true

      t.timestamps
    end
  end
end
