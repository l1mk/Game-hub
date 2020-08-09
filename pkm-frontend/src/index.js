console.log("testing...")
//variable declaration
const player_form = document.getElementById('create-player-form');
const page_container = document.getElementById('page-1');
const scores_table = document.getElementById('score-table');
const exit_bttn = document.getElementById('exit-bttn');
const ul = document.getElementById('score-ul');
let scores = [];
let currentPlayer;

//After dom load initial actions
document.addEventListener('DOMContentLoaded', () => {
    //submit form action
    player_form.addEventListener('submit', function(a){
        a.preventDefault();
        console.log('submit pressed')
        fetchNewPlayer(a.target.name.value)
        hideLogin()
      });
    //exit button action
    exit_bttn.addEventListener('click', () => {
        console.log('exit pressed')
        hidePage()
    })
    fetchScores()
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
//function declaration: rendering of scores
function renderScore(record){
    console.log('rendering', record)
    let li = document.createElement('li')
    li.innerHTML = `${record.score} by ${record.player.name}`
    ul.appendChild(li)
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
         currentPlayer = new User (object)
    })
    .catch(function(error) {
        console.log('failed', error);
        alert('Error');
    });
}
//function declaration: scores database
function fetchScores(){
    console.log('start records fetch')
    fetch('http://localhost:3000/records')
    .then(function(response){
        console.log('fetching', response);
        return response.json();
    })
    .then(function(records){
        console.log('then', records)
        records.forEach( (record) => {
            renderScore(record);
        })
    })
    }