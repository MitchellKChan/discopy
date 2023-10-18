# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create some initial users with usernames, display_names, emails, passwords, and statuses:
    User.create!(username: 'mitchibonbon',email: 'mitchi@bon.bon',password: 'a10ng3RanDm0r35ECurEpA55w0Rd',status: 'Offline')
    User.create!(username: 'DemoUser',display_name: 'demo-lition',email: 'discopydemo@user.io',password: 'password',status: 'Offline')
    User.create!(username: 'Baymax',display_name: 'Personal Healthcare Companion',email: 'baymax@bighero6.io',password: 'badaladaladala',status: 'Offline')
    User.create!(username: 'myspacetom',display_name: 'Tom',email: 'tom@my.space',password: 'password',status: 'Offline')
    User.create!(username: 'lotsahobbies',email: 'toomuch@time.onmyhands',password: 'password',status: 'Offline')

    puts "Creating servers..."
    # Create some initial servers with names, creator_ids, and public fields:
    Server.create!(name: "Big Hero 6 Fan Club",creator_id: 3,public: true)
    Server.create!(name: "Myspace",creator_id: 4,public: true)
    Server.create!(name: "Basketball",creator_id: 5,public: true)
    Server.create!(name: "Studying",creator_id: 5,public: true)
    Server.create!(name: "Football",creator_id: 5,public: true)
    Server.create!(name: "Fortnite",creator_id: 5,public: true)
    Server.create!(name: "Teamfight Tactics",creator_id: 5,public: true)
    Server.create!(name: "Genshin Impact",creator_id: 5,public: true)
    Server.create!(name: "One Piece",creator_id: 5,public: true)
    Server.create!(name: "Anime",creator_id: 5,public: true)
    Server.create!(name: "Interview Practice",creator_id: 5,public: true)
    Server.create!(name: "Invite Only",creator_id: 1,public: false)
    Server.create!(name: "Mac Users",creator_id: 5,public: true)
    Server.create!(name: "Windows Users",creator_id: 5,public: true)
    Server.create!(name: "Kirby",creator_id: 5,public: true)

    puts "Creating joined_servers..."
    # Create some initial joined_servers with server_ids and member_ids:
    JoinedServer.create!(server_id: 1,member_id: 1)
    JoinedServer.create!(server_id: 1,member_id: 2)
    JoinedServer.create!(server_id: 1,member_id: 4)
    JoinedServer.create!(server_id: 1,member_id: 5)
    JoinedServer.create!(server_id: 2,member_id: 2)
    JoinedServer.create!(server_id: 2,member_id: 5)

    puts "Creating channels..."
    # Create some initial channels with names and server_ids:
    Channel.create!(name: "general",server_id: 1)
    Channel.create!(name: "missions",server_id: 1)
    Channel.create!(name: "armor-designs",server_id: 1)
    Channel.create!(name: "general",server_id: 2)
    Channel.create!(name: "toms-channel",server_id: 2)
    Channel.create!(name: "general",server_id: 3)
    Channel.create!(name: "general",server_id: 4)
    Channel.create!(name: "general",server_id: 5)
    Channel.create!(name: "general",server_id: 6)
    Channel.create!(name: "general",server_id: 7)
    Channel.create!(name: "general",server_id: 8)
    Channel.create!(name: "general",server_id: 9)
    Channel.create!(name: "general",server_id: 10)
    Channel.create!(name: "general",server_id: 11)
    Channel.create!(name: "general",server_id: 12)
    Channel.create!(name: "general",server_id: 13)
    Channel.create!(name: "general",server_id: 14)
    Channel.create!(name: "general",server_id: 15)

    puts "Creating channel messages..."
    # Create some initial messages with bodies, author_ids, sendable_types and sendable_ids:
    Message.create!(body: "Welcome to the general channel!",author_id: 3,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "Please say hello to everyone if you'd like.",author_id: 3,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "hey i'm mitchibonbon",author_id: 1,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "Hey Baymax, huge fan!",author_id: 4,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "hi to everyone else also",author_id: 4,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "yo.  i have too many other hobbies",author_id: 5,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "feel free to check out some of my other servers",author_id: 5,sendable_type: 'Channel',sendable_id: 1)
    Message.create!(body: "welcome to my channel here in the Mysapce server!",author_id: 4,sendable_type: 'Channel',sendable_id: 5)
    Message.create!(body: "i helped build Myspace back in the day.  Let me know if you want to chat",author_id: 4,sendable_type: 'Channel',sendable_id: 5)
    Message.create!(body: "i used to use myspace all the time!  glad you're still around tom <3",author_id: 5,sendable_type: 'Channel',sendable_id: 5)

  
    # More users; may not need in final version but keeping for reference
    # 5.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier),
    #     display_name: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password',
    #     status: 'Offline'
    #   }) 
    # end
  
    puts "Done!"
  end