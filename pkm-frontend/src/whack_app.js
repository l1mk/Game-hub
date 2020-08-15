



//variables setup    

const moleA = document.querySelectorAll('.moleA')
const moleB = document.querySelectorAll('.moleB')
const timeLeft = document.querySelector('#time-left')
const startBttn = document.querySelector('#start-pause')
const resetBttn = document.querySelector('#reset')
const exitBttn = document.getElementById('exit-bttn')
const instBtn = document.querySelector('#inst-Btn')
const instruction = document.querySelector('#instructions')
let topWhackaScore = document.getElementById('top')
let grid = document.getElementsByClassName('grid')[0]
let border = document.getElementsByClassName('border')[0]
let molesScore = document.querySelector('#score-value')
let topScore = 0
let molesHitted = 0
let currentTime = timeLeft.textContent
let gameOver = false
let timerMove
let timerId
let squares

//div creation
function divCreation(){
    for (let i = 0; i < 42; i ++){
        let div = document.createElement('div')
        div.id = i +1
        div.classList.add('square')
        grid.appendChild(div)
        console.log('apended',div)
    }
    squares = document.querySelectorAll('.square')
    //Adding click reaction to every square
    squares.forEach(element => {
        element.addEventListener('mouseup', () => {
        console.log('clicked a square')
        if (element.id === hitPosition){
            if (hitMole === 'moleA' || hitMole == 'moleB' || hitMole === 'moleE' || hitMole == 'moleF'){
                molesHitted = molesHitted +4
                molesScore.textContent = molesHitted
            }
            molesHitted = molesHitted +1
            molesScore.textContent = molesHitted
        }
        })
    })
}
//game rendering
function gameRendering(){
    divCreation()
    border.id = 'whack-border'
    grid.id = 'whack-grid'
    console.log('game rendering', border, grid)
}
//random mole and square
function randomSquare(){
    console.log(squares)
    squares.forEach(element => {
         element.classList.remove('moleA')
         element.classList.remove('moleB')
         element.classList.remove('moleC')
         element.classList.remove('moleD')
         element.classList.remove('moleE')
         element.classList.remove('moleF')
         element.classList.remove('moleG')
         element.classList.remove('moleH')
         element.classList.remove('moleI')
         element.classList.remove('moleJ')
         element.classList.remove('moleK')
         element.classList.remove('moleL')
         element.classList.remove('moleM')
         element.classList.remove('moleN')
         element.addEventListener('click', punch)
         console.log(element)
    })
    let randomPosition = squares[Math.floor(Math.random() *42)]
    console.log(randomPosition)
    let moles = ['moleA', 'moleB', 'moleC', 'moleD', 'moleE', 'moleF', 'moleG', 'moleH', 'moleI', 'moleJ', 'moleK', 'moleL', 'moleM', 'moleN']
    console.log(moles)
    let randomMole = (moles.sort(() => 0.5 - Math.random()))[0]
    console.log(randomMole)
    randomPosition.classList.add(randomMole)
    hitPosition = randomPosition.id
    console.log(hitPosition)
    hitMole = randomMole
}

//move mole
function moveMole(){
    timerMove = null
    timerMove = setInterval(randomSquare, 1000)
}
//timer
function countDown(){
    currentTime = currentTime - 1
    timeLeft.textContent = currentTime
    if (currentTime === 0){
        clearInterval(timerId)
        clearInterval(timerMove)
        startBttn.textContent = 'Start'
        gameOver = true
        if (topScore < molesHitted){
            topScore = molesHitted
            topWhackaScore.innerHTML = `${topScore} points by ${currentPlayerName}`
        }
        console.log('Game Over', gameOver, 'Final score is ', molesHitted)
        fetchNewRecord(molesHitted, currentPlayer.id, currentGame.id)
    }
}
//punch
function punch(){
    this.classList.add('punch')
    setTimeout(() => this.classList.remove('punch'), 250)
}
//start-pause
function start(){
    console.log('clicked button')
    if (startBttn.textContent === 'Pause'){
        console.log('Pause')
        clearInterval(timerId)
        clearInterval(timerMove)
        startBttn.textContent = 'Start'
    } else if (startBttn.textContent === 'Start'){
        console.log('Start')
        moveMole()
        timerId = setInterval(countDown, 1000)
        startBttn.textContent = 'Pause'
        if (gameOver === true){
            molesHitted = 0
            molesScore.textContent = molesHitted
            currentTime = 30
            timeLeft.textContent = currentTime
            gameOver = false
        }
    }

}
//reset
function reset(){
        clearInterval(timerId)
        clearInterval(timerMove)
        molesHitted = 0
        molesScore.textContent = molesHitted
        currentTime = 30
        timeLeft.textContent = currentTime
        timerId = setInterval(countDown, 1000)
        gameOver = false
        moveMole()
        startBttn.textContent = 'Pause'
    }
//start button action
startBttn.addEventListener('click', start)
//reset button action
resetBttn.addEventListener('click', reset)
//instruction button action
instBtn.addEventListener('click', () =>{
    if (instBtn.innerHTML === 'Instructions'){
     instBtn.innerHTML = 'Hide'
     instruction.style.display = 'block'
    } else if (instBtn.innerHTML === 'Hide'){
     instBtn.innerHTML = 'Instructions'
     instruction.style.display = 'none'  
    }
 })
 //exit button action
 exitBttn.addEventListener('click', () => {
    console.log('exit pressed')
     reset()
     gameOver = true
     clearInterval(timerMove)
     molesHitted = 0
     molesScore.textContent = molesHitted
     currentTime = 30
     startBttn.textContent = 'Start'
    hideGame()
    })