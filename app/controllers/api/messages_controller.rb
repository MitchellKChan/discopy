class Api::MessagesController < ApplicationController
  before_action :require_logged_in
  
  wrap_parameters include: Message.attribute_names + ["authorId"] + ["parentMessageId"] + ["sendableId"] + ["sendableType"]

  def create
    @message = Message.new(message_params)
    if @message.save
      render :show
    else
      render json: {errors: @message.errors.full_messages}, status: 422
    end
  end

  def update
    @message = Message.find_by(id: params[:id])
    if @message.update(message_params)
      render :show
    else
      render json: {errors: @message.errors.full_messages}, status: 422
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    messageId = @message.id
    @message.destroy
    render json: { messageId: messageId }
  end

  private

  def message_params
    params.require(:message).permit(:body, :author_id, :parent_message_id, :sendable_id, :sendable_type)
  end
end
