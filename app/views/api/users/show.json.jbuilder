# currentUser object contains all info of the logged-in user
json.currentUser do
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

# servers object contains all info on servers related to the currentUser
json.servers do
    # create objects for all servers the currentUser has created
    @user.servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name, :public
        end
    end
    # create objects for all servers the currentUser has joined
    @user.joined_servers.each do |joined_server|
        json.set! joined_server.server.id do
            json.extract! joined_server.server, :id, :name, :public
        end    
    end
end
