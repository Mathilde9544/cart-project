class ProductsController < ApplicationController

  def index
    @products = Product.all
  end

  def substract_product
    @product = Product.find(params[:id])
    @product.decrement!(:number) if @product.number > 1
    @products = Product.all

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(ActionView::RecordIdentifier.dom_id(@product), partial: 'products/product', locals: { product: @product }),
          turbo_stream.replace("summary", partial: "products/update_total", locals: { products: @products }),
        ]
      end
    end
  end

  def add_product
    @product = Product.find(params[:id])
    @product.increment!(:number)
    @products = Product.all

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(ActionView::RecordIdentifier.dom_id(@product), partial: 'products/product', locals: { product: @product }),
          turbo_stream.replace("summary", partial: "products/update_total", locals: { products: @products }),
        ]
      end
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    @products = Product.all

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(ActionView::RecordIdentifier.dom_id(@product)),
          turbo_stream.replace("summary", partial: "products/update_total", locals: { products: @products })
        ]
      end
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
    @products = Product.all

    respond_to do |format|
      format.turbo_stream
    end
  end
end
