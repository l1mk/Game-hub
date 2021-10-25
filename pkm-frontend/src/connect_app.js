const topConnect = document.querySelector('#top')
let connectScore = document.querySelector('#score-value')
let leftData = document.querySelector('.left-data')
let showPlayer = document.createElement('h5')
let showTurn = document.createElement('h5')
const taken = [48,47,46,45,44,43,42]
let click
let turn


//div creation
function connectDivCreation(){
    for (let i = 0; i < 49; i ++){
        let div = document.createElement('div')
        div.id = i +1
        grid.appendChild(div)
        console.log('apended',div)
    }
    squares = document.querySelectorAll('.grid div')
    //Adding taken 
    taken.forEach (el => squares[el].classList.add('taken'))
}
//game rendering
function connectGameRendering(){
    connectDivCreation()
    //create new html elements
    leftData.appendChild(showPlayer)
    leftData.appendChild(showTurn)

    //start button action
    startBttn.textContent = 'Start'
    startBttn.addEventListener('click', startConnect)
    //reset button action
    resetBttn.addEventListener('click', resetConnect)
    //exit button action
    exitBttn.addEventListener('click', exitConnect)
    currentPlayer = 1;
    showPlayer.innerHTML = `Current Player: ${currentPlayer}`
    showPlayer.classList.add('red')
    topScore = 0
    click = 0
    turn = 0
    showTurn.innerHTML = `Turn Number: ${turn}`
    gameOver = true
    currentTime = 60
    timeLeft.textContent = currentTime
    border.id = 'connect-border'
    grid.id = 'connect-grid'
    console.log('game rendering')
    topConnect.innerHTML = 0
    squares.forEach(square => square.addEventListener('click', checkBoard))
        //Adding click reaction to every square
        for (let i = 0; i < squares.length; i++){
            let index = i;
            squares[i].addEventListener('click', function(){
    
                if (squares[index + 7].classList.contains('taken')){
                    if ((squares[index].classList.contains('player-one')) || (squares[index].classList.contains('player-two'))){
                        alert ('Position taken')
                    } else if (currentPlayer === 1) {
                        squares[index].classList.add('taken')
                        squares[index].classList.add('player-one')
                        currentPlayer = 2
                        showPlayer.innerHTML = `Current Player: ${currentPlayer}`
                        showPlayer.classList.remove('red')
                        showPlayer.classList.add('blue')
                        click ++
                        turn++
                        showTurn.innerHTML = `Turn Number: ${turn}`
    
                    } else if (currentPlayer === 2){
                        squares[index].classList.add('taken')
                        squares[index].classList.add('player-two')
                        currentPlayer = 1
                        showPlayer.innerHTML = `Current Player: ${currentPlayer}`
                        showPlayer.classList.remove('blue')
                        showPlayer.classList.add('red')
                        click ++
                        turn++
                        showTurn.innerHTML = `Turn Number: ${turn}`
                  }
                } else alert ('Cant Go here')
            })
        }
}

//board rules
function checkBoard() {
    //make const that shows all winning arrays
    const winningArrays = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
    [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
    [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
    [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
    [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
    [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
    [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
    ];
    //now take the 4 values in earch winningArray & plug them into the squares values
    for (let y=0; y < winningArrays.length; y++){
        const square1 = squares[winningArrays[y][0]];
        const square2 = squares[winningArrays[y][1]];
        const square3 = squares[winningArrays[y][2]];
        const square4 = squares[winningArrays[y][3]];
    
    //check if the squares belong to player
    if(square1.classList.contains('player-one') &&
        square2.classList.contains('player-one') &&
        square3.classList.contains('player-one') &&
        square4.classList.contains('player-one')) {
        connectScore.textContent = `${currentPlayer} won`
            if (topScore < click){
                topScore = click
                topConnect.innerHTML = `${currentPlayer} won in just ${topScore} turns`
                fetchNewRecord(click, currentPlayer.id, currentGame.id)
            }
            alert ('Game Over')
        } else if (square1.classList.contains('player-two') &&
        square2.classList.contains('player-two') &&
        square3.classList.contains('player-two') &&
        square4.classList.contains('player-two')) {
        connectScore.textContent = `${currentPlayer} won` 
            if (topScore < click){
                topScore = click
                topConnect.innerHTML = `${currentPlayer} won in just ${topScore} turns`
                fetchNewRecord(click, currentPlayer.id, currentGame.id)
            }
            alert ('Game Over')
        }
    }
}
//timer
function timerConnect(){
currentTime = currentTime - 1
timeLeft.textContent = currentTime
if (currentTime === 0){
    clearInterval(timerId)
    squares.forEach(square => square.removeEventListener('click', checkBoard))
    startBttn.textContent = 'Start'
    gameOver = true
    alert ('Game Over')
}
}
//destroy all created div
function destroyConnect(){
    while (grid.firstChild) {
            console.log('destroying divs')
            grid.removeChild(grid.lastChild);
    }
    squares = undefined
}

//start / pause 
function startConnect(){
    if (startBttn.textContent === 'Pause'){
        clearInterval(timerId)
        squares.forEach(square => square.removeEventListener('click', checkBoard))
        startBttn.textContent = 'Start'
    } else if (startBttn.textContent === 'Start'){
        timerId = setInterval(timerConnect, 1000)
        squares.forEach(square => square.addEventListener('click', checkBoard))
        startBttn.textContent = 'Pause'
    }
}
//reset
function resetConnect(){
    click = 0
    turn = 0
    clearInterval(timerId)
    currentTime = 60
    timeLeft.textContent = currentTime
    showTurn.innerHTML = `Turn Number: ${turn}`
    currentPlayer = 1
    showPlayer.innerHTML = `Current Player: ${currentPlayer}`
    showPlayer.classList.remove('blue')
    showPlayer.classList.add('red')
    gameOver = false
    for (let i=0; i<squares.length - 7; i++){
        squares[i].classList.remove('taken')
        squares[i].classList.remove('player-one')
        squares[i].classList.remove('player-two')
    }
    timerId = setInterval(timerConnect, 1000)
    startBttn.textContent = 'Pause'
}
//exit game
function exitConnect(){
    leftData.removeChild(showPlayer)
    leftData.removeChild(showTurn)
    console.log('exit pressed')
    resetConnect()
    clearInterval(timerId)
     currentTime = 0
     gameOver = true
     startBttn.textContent = 'Start'
     destroyConnect()
     hideGame()
     currentGame = undefined
     startBttn.removeEventListener('click', startSpace)
     resetBttn.removeEventListener('click', resetSpace)
     exitBttn.removeEventListener('click', exitSpace)
}