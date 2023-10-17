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

created_servers = @user.servers.includes(:members)
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

# joined servers object contains all joined servers related to the current_user
json.joined_servers do 
    @user.joined_servers.each do |joined_server|
        json.set! joined_server.id do 
            json.extract! joined_server, :id, :server_id, :member_id
        end
    end
end

joinable_servers = @joinable_servers
json.joinable_servers do
    joinable_servers.each do |joinable_server|
        json.set! joinable_server.id do
            json.extract! joinable_server, :id, :name, :creator_id, :public
        end
    end
end