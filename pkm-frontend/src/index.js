console.log("testing...")


document.addEventListener("DOMContentLoaded", () => {
const player_form = document.getElementById("create-player");
const login_info = document.getElementById("login-info");
const player_name = document.getElementById("player-name");


    player_form.addEventListener("submit", function(a){
        a.preventDefault();
        fetchNewPlayer(a.target.name.value);
      });
})

function renderPlayer(name){
    player_name.innerHTML = name
}

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
      return response.json();
    })
    .then(function(object) {
      renderPlayer(object.name);
    })
    .catch(function(error) {
      alert("Error");
      document.body.innerHTML = error.message;
    });
  }