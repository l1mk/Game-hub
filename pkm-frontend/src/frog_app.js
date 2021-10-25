//variable declaration for menu
let carsLeft 
let carsRight
let logsLeft 
let logsRight
let frogScore = document.querySelector('#score-value')
let topFrogScore = document.querySelector('#top')
let currentFrogIndex = 76
const endingBlock = 4
const startingBlock = 76
const logLeftPosition = [18,19,20,21,22,23,24,25,26]
const logRightPosition = [27,28,29,30,31,32,33,34,35]
const carLeftPosition = [54,55,56,57,58,59,60,61,62]
const carRightPosition = [45,46,47,48,49,50,51,52,53]
const l1 = [18,23,28,33]
const l2 = [19,24,29,34]
const l3 = [20,25,30,35]
const l4 = [21,26,31]
const l5 = [22,27,32]
const c1 = [45,48,51,54,57,60]
const c2 = [46,49,52,55,58,61]
const c3 = [47,50,53,56,59,62]

function frogDivCreation(){
    for (let i = 0; i < 80; i ++){
        let div = document.createElement('div')
        div.id = i +1
        grid.appendChild(div)
        console.log('apended',div)
    }
    squares = document.querySelectorAll('.grid div')
    //render start and end
    squares[startingBlock].classList.add('starting-block')
    squares[endingBlock].classList.add('ending-block')
    //render frog
    squares[currentFrogIndex].classList.add('frog')
    //render objects
    logLeftPosition.forEach (log => squares[log].classList.add('log-left'))
    logRightPosition.forEach (log => squares[log].classList.add('log-right'))
    carLeftPosition.forEach (log => squares[log].classList.add('car-left'))
    carRightPosition.forEach (log => squares[log].classList.add('car-right'))
    l1.forEach (log => squares[log].classList.add('l1'))
    l2.forEach (log => squares[log].classList.add('l2'))
    l3.forEach (log => squares[log].classList.add('l3'))
    l4.forEach (log => squares[log].classList.add('l4'))
    l5.forEach (log => squares[log].classList.add('l5'))
    c1.forEach (log => squares[log].classList.add('c1'))
    c2.forEach (log => squares[log].classList.add('c2'))
    c3.forEach (log => squares[log].classList.add('c3'))
    carsLeft = document.querySelectorAll('.car-left')
    carsRight = document.querySelectorAll('.car-right')
    logsLeft = document.querySelectorAll('.log-left')
    logsRight = document.querySelectorAll('.log-right')
}
//game rendering
function frogGameRendering(){
    frogDivCreation()
    topScore = 0
    currentTime = 30
    width = 9
    timeLeft.textContent = currentTime
    //start button action
    startBttn.addEventListener('click', startFrog)
    //reset button action
    resetBttn.addEventListener('click', resetFrog)
    //exit button action
    exitBttn.addEventListener('click', exitWhack)
    //class style addition
    gameOver = true
    border.id = 'frog-border'
    grid.id = 'frog-grid'
    topWhackaScore.innerHTML = 0
    console.log('game rendering')
}

//move frog
function moveFrog(e){
    squares[currentFrogIndex].classList.remove('frog')
    switch(e.keyCode) {
        case 37:
            if (currentFrogIndex % width !== 0) currentFrogIndex -=1
            break
        case 38:
            if (currentFrogIndex - width >= 0) currentFrogIndex -= width
            break
        case 39:
            if (currentFrogIndex % width < width - 1) currentFrogIndex +=1
            break
    }
    squares[currentFrogIndex].classList.add('frog')
    lose()
    win()
}
//move cars
function autoMoveCars(){
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}
//move car left on time loop
function moveCarLeft(carLeft){
    switch (true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}
//move car right on time loop
function moveCarRight(carRight){
    switch (true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}
//move logs
function autoMoveLogs(){
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}
//move log left on time loop
function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break        
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}
//move log right on time loop
function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break        
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}
//win condition
function win(){
    if (squares[4].classList.contains('frog')){
        if (topScore < currentTime){
            topScore = currentTime
            topFrogScore.innerHTML = `Finish in ${topScore} Seconds by ${currentPlayerName}`
        }
        frogScore.innerHTML = 'YOU WON'
        gameOver = true
        squares[currentFrogIndex].classList.remove('frog')
        clearInterval(timerId)
        fetchNewRecord(currentTime, currentPlayer.id, currentGame.id)
        startBttn.textContent = 'Start'
        document.removeEventListener('keyup', moveFrog)
        alert('Game is Over')
    }
}
//lose condition
function lose(){
    if ((currentTime === 0) || (squares[currentFrogIndex].classList.contains('c1'))
    || (squares[currentFrogIndex].classList.contains('l4'))
    || (squares[currentFrogIndex].classList.contains('l5'))){
        frogScore.innerHTML = "YOU LOSE"
        squares[currentFrogIndex].classList.remove('frog')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)      
    }
}
//move frog with logs
function moveWithLogLeft(){
    if (currentFrogIndex >= 27 && currentFrogIndex < 35){
        squares[currentFrogIndex].classList.remove('frog')
        currentFrogIndex += 1
        squares[currentFrogIndex].classList.add('frog')
    }
}
//move frog with logs
function moveWithLogRight(){
    if (currentFrogIndex > 18 && currentFrogIndex <= 26){
        squares[currentFrogIndex].classList.remove('frog')
        currentFrogIndex += 1
        squares[currentFrogIndex].classList.add('frog')
    }
}
//move all pieces
function movePieces(){
    currentTime--
    timeLeft.textContent = currentTime
    autoMoveCars()
    autoMoveLogs()
    moveWithLogLeft()
    moveWithLogRight()
    lose()
    console.log(currentTime, topScore)
}
//destroy all created div
function destroyFrog(){
    while (grid.firstChild) {
        console.log('destroying divs')
        grid.removeChild(grid.lastChild);
        }
        squares[currentFrogIndex].classList.remove('frog')
        squares = undefined
    }
//start-pause function
function startFrog(){
    console.log('clicked start/pause button')
    if (startBttn.innerHTML === 'Pause'){
        console.log('click pause')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)  
        startBttn.innerHTML = 'Start'
    } else if (startBttn.innerHTML === 'Start'){
        console.log('click start')
        timerId = setInterval(movePieces, 1000)
        document.addEventListener('keyup', moveFrog)
        startBttn.innerHTML = 'Pause'
        gameOver = false
    }
    gameOver = false
}
//reset function
function resetFrog(){
    console.log('reset button pressed')
    clearInterval(timerId)
    squares[currentFrogIndex].classList.remove('frog')
    currentFrogIndex = 76
    squares[currentFrogIndex].classList.add('frog')
    currentTime = 30
    timeLeft.textContent = currentTime
    frogScore.innerHTML = 0
    gameOver = false
    timerId = setInterval(movePieces, 1000)
    document.addEventListener('keyup', moveFrog)
    startBttn.innerHTML = 'Pause'
}
//exit game
function exitFrog(){
    console.log('exit pressed')
    resetFrog()
     gameOver = true
     clearInterval(timerId)
     frogScore.textContent = 0
     startBttn.textContent = 'Start'
     destroyFrog()
     hideGame()
     currentGame = undefined
     document.removeEventListener('keyup', moveFrog)  
     startBttn.removeEventListener('click', startFrog)
     resetBttn.removeEventListener('click', resetFrog)
     exitBttn.removeEventListener('click', exitFrog)
}







