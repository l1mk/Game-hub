console.log("testing...")
//variable declaration
const player_form = document.getElementById('create-player-form');
const page_container = document.getElementById('page-1');
const scores_table = document.getElementById('score-table');
const exit_bttn = document.getElementById('exit-bttn');
const score_switch = document.getElementById('score-switch')
const score_title = document.getElementById('score-title')
const ul = document.getElementById('score-ul');
let scores = [];
let currentPlayer;
let currentGame;

//temporary test
const enter = document.getElementById('enter')
const a = document.getElementById('a')
enter.addEventListener('click', function(x){
    console.log('enter', a.value)
    fetchNewRecord(a.value, currentPlayer.id, currentGame.id)
})

//temporary test 2
const start = document.getElementById('start-game')
start.addEventListener('click', function(x){
    console.log('clicked', x)
    fetchNewGame(start.textContent)
})

//After dom load initial actions
document.addEventListener('DOMContentLoaded', () => {
    //submit form action
    player_form.addEventListener('submit', function(a){
        a.preventDefault();
        console.log('submit pressed')
        fetchNewPlayer(a.target.name.value)
        fetchRecords()
        hideLogin()
      });
    //togle scores switch
    score_switch.addEventListener('click', () => {
        console.log('toglee pressed')
        let li = document.getElementsByTagName('li');
        if (score_title.textContent === 'Top Scores') {
        score_title.innerHTML = 'Player Bests'
            for (let i =0; i<li.length; i++){
                if (!li[i].textContent.includes(`${currentPlayer.name}`)){
                    li[i].classList.add('hidden');
                }
            }
        } else if (score_title.textContent === 'Player Bests') {
        score_title.innerHTML = 'Top Scores'
            for (let i =0; i<li.length; i++){
                li[i].classList.remove('hidden');
            }
        }
    })

    //exit button action
    exit_bttn.addEventListener('click', () => {
        console.log('exit pressed')
        hidePage()
    })
  
    new CurrentTime('current-time')
})
//function declaration: hide login
function hideLogin(){
    console.log('hide form')
    player_form.classList.add('hidden')
    page_container.classList.remove('hidden')

}
//function declaration: hide page
function hidePage(){
    console.log('hide page')
    page_container.classList.add('hidden')
    player_form.classList.remove('hidden')
}
//function declaration: read records database
function fetchRecords(){
    console.log('start all records fetch')
    fetch('http://localhost:3000/records')
    .then(function(response){
        console.log('fetching', response);
        return response.json();
    })
    .then(function(records){
        console.log('then', records)
        records.forEach( (record) => {
            console.log('record', record)
            let newRecord = new Record (record)
        })
    })
}
//function declaration: player creation
function fetchNewPlayer(name){
    console.log('start player fetch')
    let formData = {
        name: name
    }
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    return fetch('http://localhost:3000/players', configObj)
    .then(function(response) {
        console.log('fetching', response);
        return response.json();
    })
    .then(function(object) {
        console.log('then', object);
        currentPlayer = new Player (object)
    })
    .catch(function(error) {
        console.log('failed player', error);
        alert('Error');
    });
}

//function declaration: new record
function fetchNewRecord(score, player_id, game_id){
    console.log('start record fetch')
    let formData = {
        score: score,
        player_id: player_id,
        game_id: game_id
    }
    console.log(formData)
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    return fetch('http://localhost:3000/records', configObj)
    .then(function(response) {
        console.log('fetching', response);
        return response.json();
    })
    .then(function(object) {
        console.log('then', object);
        let newRecord = new Record (object)
    })
    .catch(function(error) {
        console.log('failed record', error);
        alert('Error');
    });
}

//function declaration: new game
function fetchNewGame(title){
    console.log('start game fetch')
    let formData = {
        title: title,
    }
    console.log(formData)
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    return fetch('http://localhost:3000/games', configObj)
    .then(function(response) {
        console.log('fetching', response);
        return response.json();
    })
    .then(function(object) {
        console.log('then', object);
        currentGame = new Game (object)
    })
    .catch(function(error) {
        console.log('failed game', error);
        alert('Error');
    });
}