//variables setup    
let topWhackaScore = document.getElementById('top')
let molesScore = document.querySelector('#score-value')
let molesHitted = 0
let timerMove
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
        if (element.id === hitPosition && startBttn.textContent === 'Pause'){
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
function whackGameRendering(){
    divCreation()
    border.id = 'whack-border'
    grid.id = 'whack-grid'
    console.log('game rendering', border, grid)
}
//random mole and square
function randomSquare(){
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
        alert('Game is Over')
    }
}
//punch animation
function punch(){
    this.classList.add('punch')
    setTimeout(() => this.classList.remove('punch'), 250)
}
//destroy all created div
function destroyHoles(){
    while (grid.firstChild) {
        console.log('destroying divs')
        grid.removeChild(grid.lastChild);
      }
}
//start-pause
function startWhack(){
    console.log('clicked start/pause button')
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
function resetWhack(){
    console.log('reset button pressed')
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
//exit game
function exitWhack(){
    console.log('exit pressed')
     resetWhack()
     gameOver = true
     clearInterval(timerId)
     clearInterval(timerMove)
     molesHitted = 0
     molesScore.textContent = molesHitted
     currentTime = 30
     startBttn.textContent = 'Start'
     destroyHoles()
     hideGame()
     currentGame = undefined
}
//start button action
startBttn.addEventListener('click', startWhack)
//reset button action
resetBttn.addEventListener('click', resetWhack)
//exit button action
exitBttn.addEventListener('click', exitWhack)




