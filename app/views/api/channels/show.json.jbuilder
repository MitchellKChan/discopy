json.partial! 'channel', channel: @channel

messages = @channel.messages.includes(:author)

json.messages do
    messages.each do |message|
        json.set! message.id do
            json.extract! message, 
                :id, 
                :body, 
                :author_id, 
                :sendable_id, 
                :sendable_type, 
                :created_at, 
                :updated_at
        end
    end
end