class Api::ServersController < ApplicationController
  before_action :require_logged_in

  debugger
  def create
    @server = Server.new(server_params)
    if @server.save
      render :show
    else
      render json: {errors: @server.errors.full_messages}, status: 422
    end
  end

  def update
    debugger
    @server = Server.find_by(id: params[:id])
    if @server.update(server_params)
      render :show
    else
      render json: {errors: @server.errors.full_messages}, status: 422
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    serverId = @server.id
    @server.destroy
    render json: { serverId: serverId }
  end

  private

  def server_params
    params.require(:server).permit(:name, :creator_id, :public)
  end
end
