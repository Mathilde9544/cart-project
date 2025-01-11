class CartController < ApplicationController
  def show
    @cart = Product.all
  end
end
