class AddProductToCart < ActiveRecord::Migration[7.1]
  def change
    add_reference :carts, :product, null: false, foreign_key: true
  end
end
