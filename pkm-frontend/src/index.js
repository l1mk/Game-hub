console.log('booting...')
//variable declaration for menu
const playerForm = document.getElementById('create-player-form')
const loggedContainer = document.getElementById('logged-page')
const ScoresTables = document.getElementById('score-table')
const scoreSwitch = document.getElementById('score-switch')
const scoreTitle = document.getElementById('score-title')
const ul = document.getElementById('score-ul')
const logoutLink = document.getElementById('logout')
const gameHud = document.getElementById('game-hud')
const gameSelection = document.getElementById('game-selection-layout')
const whackIcon = document.getElementById('whack-image')
const memoryIcon = document.getElementById('memory-image')
let gameTitle = document.getElementById('game-title')
let currentPlayerNameText = document.getElementById('player-name')
let currentPlayer
let currentPlayerName
let currentGame
//variable declaration for in games variable
const moleA = document.querySelectorAll('.moleA')
const moleB = document.querySelectorAll('.moleB')
const timeLeft = document.querySelector('#time-left')
const startBttn = document.querySelector('#start-pause')
const resetBttn = document.querySelector('#reset')
const exitBttn = document.getElementById('exit-bttn')
const instBtn = document.querySelector('#inst-Btn')
const instruction = document.querySelector('#instructions')
let grid = document.getElementsByClassName('grid')[0]
let border = document.getElementsByClassName('border')[0]
let topScore = 0
let currentTime = timeLeft.textContent
let timerId
let gameOver = false
//After dom load initial actions
document.addEventListener('DOMContentLoaded', () => {
    //submit form action
    playerForm.addEventListener('submit', function(a){
        a.preventDefault();
        console.log('submit pressed')
        showMenu()
        fetchNewPlayer(capitalize(a.target.name.value))
        fetchRecords()
        hideLogin()
      });
    //logout link
    logoutLink.addEventListener('click', (a) => {
        console.log('logout clicked')
        a.preventDefault()
        let currentPlayer = undefined
        let currentPlayerName = undefined
        scoreTitle.innerHTML = 'All Top Scores'
        exitWhack()
        hideGame()
        hideMenu()
        loggedContainer.classList.add('hidden')
        playerForm.classList.remove('hidden')
        Record.destroyScores()
    })
    //Game Selection
    whackIcon.addEventListener('click', function(x){
        console.log('clicked', x)
        let title = "Whack a Mole"
        fetchNewGame(title)
        gameHud.classList.remove('hidden')
        gameTitle.innerHTML = title
        topScore = 0
        whackGameRendering()
        hideMenu()
    })
    memoryIcon.addEventListener('click', function(x){
        console.log('clicked', x)
        let title = "Memory"
        fetchNewGame(title)
        gameHud.classList.remove('hidden')
        gameTitle.innerHTML = title
        topScore = 0
        memoryGameRendering()
        hideMenu()
    })
    //togle scores switch
    scoreSwitch.addEventListener('click', () => {
        console.log('toglee pressed', scoreSwitch.value)
        let li = document.getElementsByTagName('li');
        if (scoreTitle.textContent === 'All Top Scores') {
            console.log(li)
        scoreTitle.innerHTML = `Player ${currentPlayerName} Bests`
            for (let i =0; i<li.length; i++){
                if (!li[i].textContent.includes(`${currentPlayer.name}`)){
                    li[i].classList.add('hidden');}
            }
        } else if (scoreTitle.textContent === `Player ${currentPlayerName} Bests`) {
        scoreTitle.innerHTML = 'All Top Scores'
            for (let i =0; i<li.length; i++){
                li[i].classList.remove('hidden');
            }
        }
    })
    //instruction button action
    instBtn.addEventListener('click', () =>{
        console.log('instruction button pressed')
        if (instBtn.innerHTML === 'Instructions'){
            instBtn.innerHTML = 'Hide'
            instruction.style.display = 'block'
        } else if (instBtn.innerHTML === 'Hide'){
            instBtn.innerHTML = 'Instructions'
            instruction.style.display = 'none'  
        }
    })
    new CurrentTime('current-time')
})
//function declaration: capitalize names
function capitalize(name){
return name.charAt(0).toUpperCase() + name.slice(1)
}
//function declaration: show menu  
function showMenu(){
    console.log('show menu')
    gameSelection.classList.remove('hidden')
}
//function declaration: hide login
function hideLogin(){
    console.log('hide form')
    playerForm.classList.add('hidden')
    loggedContainer.classList.remove('hidden')
}
//function declaration: hide menu
function hideMenu(){
    console.log('hide menu')
gameSelection.classList.add('hidden')
}
//function declaratio: hide game
function hideGame(){
    console.log('hide game')
    gameHud.classList.add('hidden')
    showMenu()
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
        //sorted the records result by highest record value
        let sortedRecords = records.sort(function (a,b){
            return b.score - a.score;
        })
        console.log('sorted', sortedRecords)
        //find all players 
        let playersId = [];
        sortedRecords.forEach((record) => {
            if (playersId.length === 0){
                playersId.push(record.player.id)
                console.log("pushing first id")
            } else {
                if (!playersId.includes(record.player.id)){
                    playersId.push(record.player.id)
                    console.log("pushing unique")
                }
              console.log("already pushed")
            }
        })
        console.log('players', playersId)
        //filter record by unique players
        let filteredRecord = [];
        playersId.forEach((id) => { 
            let uniqueRecord = sortedRecords.find(element => element.player_id === id) 
            filteredRecord.push(uniqueRecord)
        }) 
        console.log('filter', filteredRecord)
        //passing the filtered record to create each record class
        for (let i = 0; i < filteredRecord.length; i++){
            console.log('record', filteredRecord[i], i)
            let newRecord = new Record (filteredRecord[i])
        }
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
        currentPlayerName = capitalize(currentPlayer.name)
        console.log("log as ", currentPlayerName)
        currentPlayerNameText.innerText = currentPlayerNameText
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