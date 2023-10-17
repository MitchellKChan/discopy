class Api::ChannelsController < ApplicationController
    before_action :require_logged_in

    wrap_parameters include: Channel.attribute_names + ["serverId"]

end
