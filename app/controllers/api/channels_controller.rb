class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  wrap_parameters include: Channel.attribute_names + ["serverId"]
  
  def create
    @channel = Channel.new(channels_params)
    if @channel.save
      render :show
    else
      render json: {errors: @channel.errors.full_messages}, status: 422
    end
  end 

  def update
    @channel = Channel.find_by(id: params[:id])
    if @channel.update(channels_params)
      render :show
    else
      render json: {errors: @channel.errors.full_messages}, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    channelId = @channel.id
    @channel.destroy
    render json: { channelId: channelId }
  end
  
  private
  def channels_params
    params.require(:channel).permit(:name, :server_id)
  end
end
