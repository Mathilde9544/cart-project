class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
  end
end
