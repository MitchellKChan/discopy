class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    @user = current_user
    if @user
      render "api/users/show"
    else
      render json: nil
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    if @user
      login!(@user)
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
