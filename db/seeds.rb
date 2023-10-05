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
    # Create some initial users with usernames, display_names, emails, passwords, and phone_numbers:
    User.create!(
        username: 'mitchibonbon',
        display_name: 'mitchibonbon',
        email: 'mitchi@bon.bon',
        phone_number: '31337313337',
        password: 'a10ng3RanDm0r35ECurEpA55w0Rd'
    )
    User.create!(
      username: 'DemoUser',
      display_name: 'demo-lition',
      email: 'discopydemo@user.io',
      phone_number: '1234567890',
      password: 'password'
    )

    # Create a user with a username, display_names, email, password, but no phone_number:
    User.create!(
      username: 'myspacetom',
      display_name: 'Tom',
      email: 'tom@my.space',
      password: 'password'
    )
  
    # More users
    5.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        display_name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        phone_number: rand.to_s[2..11],
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end