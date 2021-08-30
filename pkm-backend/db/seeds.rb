# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Player.delete_all
Game.delete_all
Record.delete_all

player = Player.create(name: 'One')
game = Game.create(title: 'tetris test')
record = Record.create(score: 999, player_id: 0, game_id: 0)

