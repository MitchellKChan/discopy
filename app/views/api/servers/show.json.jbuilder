json.partial! 'server', server: @server
channels = @server.channels.includes(:messages)
members = @server.members

json.channels do
    channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :server_id
        end
    end
end

json.member_ids do
    members.each do |member|
        json.set! member.id do
            json.extract! member, :id
        end
    end
end

json.members do
    members.each do |member|
        json.set! member.id do
            json.extract! member,
                :id,
                :username,
                :display_name,
                :avatar,
                :about_me,
                :status,
                :custom_status
        end
    end
end

