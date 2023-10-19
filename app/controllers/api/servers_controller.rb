class Api::ServersController < ApplicationController
  before_action :require_logged_in

  wrap_parameters include: Server.attribute_names + ["creatorId"]

  def show
    @server = Server.find_by(id: params[:id])
    if @server
      render :show
    else
      render json: {errors: @server.errors.full_messages}, status: 422
    end
  end

  def create
    @server = Server.new(server_params)
    if @server.save
      # auto create a 'general' channel for new servers
      general_channel = Channel.new(name: "general", server_id: @server.id)
      joined_server = JoinedServer.new(member_id: params[:creator_id], server_id: @server_id)
      if general_channel.save && joined_server.save
        render :show
      end
    else
      render json: {errors: @server.errors.full_messages}, status: 422
    end
  end

  def update
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
