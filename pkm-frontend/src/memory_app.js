    //variables setup   
    let topMemoryScore = document.querySelector('#top')
    let cardScore = document.querySelector('#score-value');
    var cardsChoosen = [];
    var cardsChoosenId = [];
    var cardsWon = [];

//card options
const cardArray = [
    {
        name: 'pkm-01',
        img: 'src/styles/images/memory/pkm-01.jpg'
    },
    {
        name: 'pkm-01',
        img: 'src/styles/images/memory/pkm-01.jpg'
    },
    {
        name: 'pkm-02',
        img: 'src/styles/images/memory/pkm-02.jpg'
    },
    {
        name: 'pkm-02',
        img: 'src/styles/images/memory/pkm-02.jpg'
    },
    {
        name: 'pkm-03',
        img: 'src/styles/images/memory/pkm-03.jpg'
    },
    {
        name: 'pkm-03',
        img: 'src/styles/images/memory/pkm-03.jpg'
    },
    {
        name: 'pkm-04',
        img: 'src/styles/images/memory/pkm-04.jpg'
    },
    {
        name: 'pkm-04',
        img: 'src/styles/images/memory/pkm-04.jpg'
    },
    {
        name: 'pkm-05',
        img: 'src/styles/images/memory/pkm-05.jpg'
    },
    {
        name: 'pkm-05',
        img: 'src/styles/images/memory/pkm-05.jpg'
    },
    {
        name: 'pkm-06',
        img: 'src/styles/images/memory/pkm-06.jpg'
    },
    {
        name: 'pkm-06',
        img: 'src/styles/images/memory/pkm-06.jpg'
    },
    {
        name: 'pkm-07',
        img: 'src/styles/images/memory/pkm-07.jpg'
    },
    {
        name: 'pkm-07',
        img: 'src/styles/images/memory/pkm-07.jpg'
    },
    {
        name: 'pkm-08',
        img: 'src/styles/images/memory/pkm-08.jpg'
    },
    {
        name: 'pkm-08',
        img: 'src/styles/images/memory/pkm-08.jpg'
    },
    {
        name: 'pkm-09',
        img: 'src/styles/images/memory/pkm-09.jpg'
    },
    {
        name: 'pkm-09',
        img: 'src/styles/images/memory/pkm-09.jpg'
    },
    {
        name: 'pkm-10',
        img: 'src/styles/images/memory/pkm-10.jpg'
    },
    {
        name: 'pkm-10',
        img: 'src/styles/images/memory/pkm-10.jpg'
    },
    {
        name: 'pkm-11',
        img: 'src/styles/images/memory/pkm-11.jpg'
    },
    {
        name: 'pkm-11',
        img: 'src/styles/images/memory/pkm-11.jpg'
    },
    {
        name: 'pkm-12',
        img: 'src/styles/images/memory/pkm-12.jpg'
    },
    {
        name: 'pkm-12',
        img: 'src/styles/images/memory/pkm-12.jpg'
    },
    {
        name: 'pkm-13',
        img: 'src/styles/images/memory/pkm-13.jpg'
    },
    {
        name: 'pkm-13',
        img: 'src/styles/images/memory/pkm-13.jpg'
    },
    {
        name: 'pkm-14',
        img: 'src/styles/images/memory/pkm-14.jpg'
    },
    {
        name: 'pkm-14',
        img: 'src/styles/images/memory/pkm-14.jpg'
    },
    {
        name: 'pkm-15',
        img: 'src/styles/images/memory/pkm-15.jpg'
    },
    {
        name: 'pkm-15',
        img: 'src/styles/images/memory/pkm-15.jpg'
    },
    {
        name: 'pkm-16',
        img: 'src/styles/images/memory/pkm-16.jpg'
    },
    {
        name: 'pkm-16',
        img: 'src/styles/images/memory/pkm-16.jpg'
    },
    {
        name: 'pkm-17',
        img: 'src/styles/images/memory/pkm-17.jpg'
    },
    {
        name: 'pkm-17',
        img: 'src/styles/images/memory/pkm-17.jpg'
    },
    {
        name: 'pkm-18',
        img: 'src/styles/images/memory/pkm-18.jpg'
    },
    {
        name: 'pkm-18',
        img: 'src/styles/images/memory/pkm-18.jpg'
    },
]
cardArray.sort(() => 0.5 - Math.random())

//create board
function createBoard(){
    for (let i=0; i<cardArray.length; i++){
        var card = document.createElement('img');
        card.setAttribute('src', 'src/styles/images/memory/pkm-pokeball.png');
        card.setAttribute('data-id', i);
        card.classList.add('card')
        card.addEventListener('click', flipcard);
        grid.appendChild(card)
    }
}
//render game
function memoryGameRendering(){
    createBoard()
    //start button action
    startBttn.addEventListener('click', startMemory)
    //reset button action
    resetBttn.addEventListener('click', resetMemory)
    //exit button action
    exitBttn.addEventListener('click', exitMemory)
    //class style addition
    border.id = 'memory-border'
    grid.id = 'memory-grid'
    topScore = 0
    gameOver = true
    topMemoryScore.innerHTML = 0
    console.log('game rendering')
}
//find match
function checkForMatch(){
    var cards = document.querySelectorAll('img');
    var optionOneId = cardsChoosenId[0];
    var optionTwoId = cardsChoosenId[1];
    if (cardsChoosen[0] === cardsChoosen[1]){
        cards[optionOneId].setAttribute('src', 'src/styles/images/memory/blank.png')
        cards[optionTwoId].setAttribute('src', 'src/styles/images/memory/blank.png')
        cardsWon.push(cardsChoosen)
    } else {
        cards[optionOneId].setAttribute('src', 'src/styles/images/memory/pkm-pokeball.png')
        cards[optionTwoId].setAttribute('src', 'src/styles/images/memory/pkm-pokeball.png')
        border.classList.add('flash')
        setTimeout(() => border.classList.remove('flash'), 250)
        console.log('missmatch cards')
    }
    cardsChoosen = [];
    cardsChoosenId = [];
    cardScore.innerHTML = cardsWon.length
    if (cardsWon.length === cardArray.length/2){
        if (topScore < cardsWon.length){
            topScore = cardsWon.length
            topMemoryScore.innerHTML = `${topScore} by ${currentPlayerName}`  
        }
        cardScore.innerHTML = "Congratulations, You Won"   
        gameOver = true
        clearInterval(timerId)
        startBttn.textContent = 'Start'
        fetchNewRecord(cardsWon.length, currentPlayer.id, currentGame.id)
        alert ("game over")
    }
}
//flipcard 
function flipcard(){
    if (startBttn.textContent === 'Pause'){
        var cardId = this.getAttribute('data-id');
        cardsChoosen.push(cardArray[cardId].name);
        cardsChoosenId.push(cardId); 
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChoosen.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }
}
//timer
function timer(){
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0){
        if (topScore < cardsWon.length){
            topScore = cardsWon.length
            topMemoryScore.innerHTML = `${topScore} by ${currentPlayerName}`  
        }
        gameOver = true
        clearInterval(timerId)
        startBttn.textContent = 'Start'
        fetchNewRecord(cardsWon.length, currentPlayer.id, currentGame.id)
        alert ("Times up, Try Again")
    }
}
//destroy cards
function destroyCards(){
    while ( grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }  
    squares = undefined
}
//start-pause
function startMemory(){
    console.log('clicked start/pause button')
    if (startBttn.textContent === 'Pause'){
        console.log('Pause')
        clearInterval(timerId)
        startBttn.textContent = 'Start'
    } else if (startBttn.textContent === 'Start'){
        console.log('Start')
        timerId = setInterval(timer, 1000)
        startBttn.textContent = 'Pause'
        if (gameOver === true){
        resetMemory()
        }
        gameOver = false
    }
}
//reset
function resetMemory(){
    clearInterval(timerId)
    currentTime = 30
    timeLeft.textContent = currentTime
    cardScore.innerHTML = 0;
    cardsChoosen = [];
    cardsChoosenId = [];
    cardsWon = [];
    gameOver = false
    while ( grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    cardArray.sort(() => 0.5 - Math.random())
    createBoard()
    timerId = setInterval(timer, 1000)
}
//exit game
function exitMemory(){
    console.log('exit pressed')
     resetMemory()
     gameOver = true
     clearInterval(timerId)
     topScore = 0
     currentTime = 30
     startBttn.textContent = 'Start'
     destroyCards()
     hideGame()
     currentGame = undefined
    startBttn.removeEventListener('click', startMemory)
    resetBttn.removeEventListener('click', resetMemory)
    exitBttn.removeEventListener('click', exitMemory)
}
