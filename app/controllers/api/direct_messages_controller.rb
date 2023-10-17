class Api::DirectMessagesController < ApplicationController
    before_action :require_logged_in

    wrap_parameters include: DirectMessage.attribute_names + ["firstUserId"] + ["secondUserId"]

    def create
        debugger
        @direct_message = DirectMessage.new(direct_message_params)
        if @direct_message.save
            render :show
        else
            render json: {errors: @direct_message.errors.full_messages}, status: 422
        end
    end

    def destroy
        @direct_message = DirectMessage.find_by(id: params[:id])
        directMessageId = @direct_message.id
        @direct_message.destroy
        render json: { directMessageId: directMessageId }
    end

    private
    def direct_message_params
        params.require(:direct_message).permit(:first_user_id, :second_user_id)
    end
end
