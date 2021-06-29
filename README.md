# pokemon-project

SPA using javascript HTML CSS for frontend and Rails API for backend.

Setup:
- Clone this repository and paste in your terminal.
- Go inside the folder you just cloned using $cd pokemon-project
- While on it, go inside the next subfolder using $cd pkm-backend to navigat to the rails API and start the migration with
$rake db:migrate.
- If you want you can test the API using the rails console command, $rails c. While on it, try creating new models for each like Game.create(title: "your title")
- After testing the models you can fire up the Server using $rails server
- You can visit http://localhost:3000/games on your browser to confirm the server is live.
- Go back to previous folder using $cd - and from there go to /pkm-frontend in your editor and open the HTML file (for VScode you can right click and "Open with live server").

Usage: 
The app consist on a game hub, where after login in using a name or nickname, you are able to choose from different games, and see all scores for all games made by every player, you can filter to see only your scores too.
There is two games right now, a whack a mole and a memory game.

  -. Whack-a-Mole: in this game the goal is to click the pokemon appearing in the screen to make points, before the times runs out. You can get extra point for certain pokemons, and at the end the game will record your new scores in the table on the right side.
  -. Memory: in this game you have to find two matches of the same card, you can do this by click every pokeball, you get a point for every match card, after times run out or you find all card that matches, game ends and your score is recorded and save to the score table on the right.
  
  Both games have a start/pause button, a reset and a exit button to go back to the previous screen. 
  
 Additional:
 More games will be added later, in the meantime enjoy this two.
 Tutorial for all games I learned to build are here:
 https://www.youtube.com/watch?v=lhNdUVh3qCc&t=1659s
 
 Every game individually was made outisde this code first and then adapted to the project. For now is only two, ill be updating to add all.
 Here is the Repository of each:
 - https://github.com/l1mk/whack_a_mole_extra_curriculum
 - https://github.com/l1mk/memory_extra_curriculum
 - https://github.com/l1mk/space_invader_extra_curriculum
 - https://github.com/l1mk/snake_extra_curriculum
 - https://github.com/l1mk/frogger_extra_curriculum
 - https://github.com/l1mk/connect_four_extra_curriculum
-  https://github.com/l1mk/tetris_extra_curriculum

 Suppport:
 Feel free to reach out, if you see a bug or if you believe there is something to be improved.
 
 License:
 The pokemon artwork was taken from different sources online. 
 Nintendo and the Pokemon company own the right of everything Pokemon related. I used free images and edited some of them using illustrator.
 
