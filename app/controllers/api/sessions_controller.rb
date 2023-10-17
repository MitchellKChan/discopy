class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    @user = current_user
    if @user
      @joinable_servers = Server
        .select(:id, :name, :creator_id, :public)
        .where(public: true)
        .where.not(creator_id: @user.id)
      render "api/users/show"
    else
      render json: nil
    end
  end

  def create
    if params.has_key?(:demo)
      @user = User.find_by(id: 2)
    else
      @user = User.find_by_credentials(params[:credential], params[:password])
    end
    if @user
      login!(@user)
      @joinable_servers = Server
        .select(:id, :name, :creator_id, :public)
        .where(public: true)
        .where.not(creator_id: @user.id)
      render "api/users/show"
    else
      render json: {errors: ["Invalid credentials"]}, status: 422
    end
  end

  def destroy
    userId = current_user.id
    logout!
    render json: {userId: userId}
  end
end
