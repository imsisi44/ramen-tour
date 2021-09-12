class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @areas=Area.all
    favorites = Favorite.where(user_id: current_user.id).pluck(:shop_id)
    @shops = Shop.find(favorites).sort {|a,b| b.favorites.count <=> a.favorites.count}
  end

end
