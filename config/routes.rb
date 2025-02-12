Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"


  post "/", to: 'products#reset', as: :reset_cart
  get "/", to:"products#index", as: :products
  patch "/products/:id", to: "products#update", as: :update_product
  patch "/products/:id/substract", to: "products#substract_product", as: :substract_product
  patch "/products/:id/add", to: "products#add_product", as: :add_product
  delete "products/:id", to: "products#destroy", as: :destroy

end
