console.log("testing...")
//variable declaration
const player_form = document.getElementById("create-player");
const login_info = document.getElementById("login-info");
const player_name = document.getElementById("player-name");
const score_div = document.getElementById("score-div")
const scores_table = document.getElementsByClassName("score-table")[0]
let scores = [];
//After dom load initial actions
document.addEventListener("DOMContentLoaded", () => {
    //submit form action
    player_form.addEventListener("submit", function(a){
        a.preventDefault();
        console.log('submit pressed')
        fetchNewPlayer(a.target.name.value);
      });
})

//function declartion: rendering of player
function renderPlayer(name){
    console.log('rendering', name)
    player_name.innerHTML = name
    login_info.classList.remove('hidden')
    player_form.classList.add('hidden')
    renderScore()
}
//function declartion: rendering of scores
function renderScore(){
score_div.classList.remove('hidden')
fetchScore()
}
//function declaration: new player creation
function fetchNewPlayer(name){
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          "name": name
        })
    };
    return fetch('http://localhost:3000/players', configObj)
    .then(function(response) {
        console.log('fetching', response)
      return response.json();
    })
    .then(function(object) {
        console.log('then', object)
      renderPlayer(object.name);
    })
    .catch(function(error) {
        console.log('failed', error)
      alert("Error");
    });
  }