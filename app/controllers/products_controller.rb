class ProductsController < ApplicationController

  def index
    @products = Product.all
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    @products = Product.all

    respond_to do |format|
      format.turbo_stream
    end
  end

  def reset
    Product.destroy_all

    Product.create!(name: "Wireless speaker, Goodyear", price: 100, number: 1, image_url: "speaker.jpg")
    Product.create!(name: "Women's Home Suit, Sweet Dreams", price: 25, number: 1, image_url: "home-suit.jpg")
    Product.create!(name: "Raincoat, SwissOak", price: 50, number: 2, image_url: "raincoat.jpg")

    @products = Product.all
    redirect_to products_path
  end

  def update
    @product = Product.find(params[:id])
    @product.update(number: params[:number])

    respond_to do |format|
      format.turbo_stream
    end

    redirect_to products_path
  end
end
