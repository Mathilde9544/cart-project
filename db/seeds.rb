# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Product.create!(name: "Wireless speaker, Goodyear", price: 100, number: 1, image_url: "speaker.jpg")
Product.create!(name: "Women's Home Suit, Sweet Dreams", price: 25, number: 1, image_url: "home-suit.jpg")
Product.create!(name: "Raincoat, SwissOak", price: 50, number: 2, image_url: "raincoat.jpg")
