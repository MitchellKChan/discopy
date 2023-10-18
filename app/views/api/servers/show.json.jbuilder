json.partial! 'server', server: @server

channels = @server.channels.includes(:messages)

json.channels do
    channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :server_id
        end
    end
end