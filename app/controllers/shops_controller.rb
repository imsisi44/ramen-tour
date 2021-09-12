class ShopsController < ApplicationController

  def index
    @yamaguchi = Area.find(2)
    @fukuoka = Area.find(3)
    @shops = Shop.all.sort {|a,b| b.favorites.count <=> a.favorites.count}
  end

  def show
    @shop = Shop.find(params[:id])
    @shops = Shop.where.not(id: @shop.id).where(area_id: @shop.area_id).sort {|a,b| b.favorites.count <=> a.favorites.count}
  end

  def search
    @yamaguchi = Area.find(2)
    @fukuoka = Area.find(3)
    @shops = Shop.search(params[:search])
  end



end
