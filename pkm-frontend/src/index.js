console.log("testing...")


document.addEventListener("DOMContentLoaded", () => {
const player_form = document.getElementById("create-player");
const login_info = document.getElementById("login-info");
const player_name = document.getElementById("player-name");


    player_form.addEventListener("submit", function(a){
        a.preventDefault();
        fetchNewPlayer(a.target.name.value, a.target.password.value);
      });
})

function renderPlayer(name, password){
    player_name.innerHTML = `${name} , ${password}`
}

function fetchNewPlayer(name, password){
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          "name": name,
          "password": password,
        })
    };
    return fetch('http://localhost:3000/players', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      renderPlayer(object.name, object.password);
    })
    .catch(function(error) {
      alert("Error");
      document.body.innerHTML = error.message;
    });
  }