Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  root to: "shops#index"
  resources :shops, only: [:index, :show] do
    resources :comments, only: [:new, :create, :destroy]
  end

  get 'search' => 'shops#search'

  post '/favorites/:shop_id/favorites' => "favorites#create"
  delete '/favorites/:shop_id/favorites' => "favorites#destroy"
  resources :users, only: :show
  resources :areas, only: :show

end
