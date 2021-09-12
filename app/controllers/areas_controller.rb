class AreasController < ApplicationController
  before_action :set_area

  def show
    @yamaguchi = Area.find(2)
    @fukuoka = Area.find(3)
    @shops = @area.set_shops.sort {|a,b| b.favorites.count <=> a.favorites.count}
  end
  
  private
  def set_area
    @area = Area.find(params[:id])
  end
end
