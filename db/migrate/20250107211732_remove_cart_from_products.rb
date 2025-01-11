class RemoveCartFromProducts < ActiveRecord::Migration[7.1]
  def change
    remove_reference :products, :cart, null: false, foreign_key: true
  end
end
