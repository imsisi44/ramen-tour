class FavoritesController < ApplicationController
  before_action :authenticate_user! 
  before_action :set_shop

  def create
    @favorite = Favorite.create(user_id: current_user.id, shop_id: @shop.id)
    @favorite.save
  end

  def destroy
    @favorite = Favorite.find_by(user_id: current_user.id, shop_id: @shop.id)
    @favorite.destroy
  end

  private

  def set_shop
    @shop = Shop.find(params[:shop_id])
  end

end
