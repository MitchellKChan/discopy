class Api::UsersController < ApplicationController
  before_action :require_logged_out

  wrap_parameters include: User.attribute_names + ['password'] + ['displayName']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :display_name, :password)
  end
end
