class CommentsController < ApplicationController
  before_action :set_shop

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to shop_path(@shop)
    else
      render :new
    end
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to shop_path(@shop)
  end

  private

  def comment_params
    params.require(:comment).permit(:title, :rate, :text).merge(user_id: current_user.id, shop_id: params[:shop_id])
  end

  def set_shop
    @shop = Shop.find(params[:shop_id])
  end

end
