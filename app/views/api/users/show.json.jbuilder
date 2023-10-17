# current_user object contains all info of the logged-in user
json.current_user do
    json.extract! @user, 
        :id, 
        :email, 
        :username, 
        :display_name, 
        :avatar, 
        :about_me, 
        :status, 
        :custom_status, 
        :created_at
end

created_servers = @user.servers.includes(:members, :channels)
joined_servers = @user.joined_servers.includes(:server)

# servers object contains all info on servers related to the current_user
json.servers do
    # create objects for all servers the current_user has created
    created_servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name, :creator_id, :public
        end
    end
    # create objects for all servers the current_user has joined
    joined_servers.each do |joined_server|
        json.set! joined_server.server.id do
            json.extract! joined_server.server, :id, :name, :creator_id, :public
        end    
    end
end

# joined_servers object contains all joined servers related to the current_user
json.joined_servers do 
    @user.joined_servers.each do |joined_server|
        json.set! joined_server.id do 
            json.extract! joined_server, :id, :server_id, :member_id
        end
    end
end

# joinable_servers object contains all public servers
joinable_servers = @joinable_servers.includes(:members, :channels)
json.joinable_servers do
    joinable_servers.each do |joinable_server|
        json.set! joinable_server.id do
            json.extract! joinable_server, :id, :name, :creator_id, :public
        end
    end
end

# channels object contains all channels for all servers, joined_servers,
# and joinable_servers
json.channels do
    created_servers.each do |server|
        server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :name, :server_id
            end
        end
    end
    joined_servers.each do |joined_server|
        joined_server.server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :name, :server_id
            end
        end  
    end
    joinable_servers.each do |joinable_server|
        joinable_server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :name, :server_id
            end
        end  
    end
end