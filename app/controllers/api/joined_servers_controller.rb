class Api::JoinedServersController < ApplicationController
  before_action :require_logged_in

  wrap_parameters include: JoinedServer.attribute_names + ["serverId"] + ["memberId"]

  def create
    @joined_server = JoinedServer.new(joined_server_params)
    if @joined_server.save
      render :show
    else
      render json: {errors: @joined_server.errors.full_messages}, status: 422
    end
  end

  def destroy
    @joined_server = JoinedServer.find_by(id: params[:id])
    joinedServerId = @joined_server.id
    @joined_server.destroy
    render json: { joinedServerId: joinedServerId }
  end

  private

  def joined_server_params
    params.require(:joined_server).permit(:server_id, :member_id)
  end
end
