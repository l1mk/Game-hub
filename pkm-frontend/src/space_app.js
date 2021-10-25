    //variables setup    
    const spaceScore = document.querySelector('#score-value')
    let topSpaceScore = document.querySelector('#top')
    
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvadersTakeDown = []
    let timePass = 0
    let enemiesHitted = 0
    let direction = 1
    let invaderId

    //define alien
    let alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //div creation
    function spaceDivCreation(){
        for (let i = 0; i < 224; i ++){
            let div = document.createElement('div')
            div.id = i +1
            grid.appendChild(div)
            console.log('apended',div)
        }
        squares = document.querySelectorAll('.grid div')
        //draw aliens
        alienInvaders.forEach (invader => squares[currentInvaderIndex + invader].classList.add('invader'))
        //draw shooter
        squares[currentShooterIndex].classList.add('shooter')
    }

    //game rendering
    function spaceGameRendering(){
        spaceDivCreation()
        //start button action
        startBttn.textContent = 'Start'
        startBttn.addEventListener('click', startSpace)
        //reset button action
        resetBttn.addEventListener('click', resetSpace)
        //exit button action
        exitBttn.addEventListener('click', exitSpace)
        //class style addition
        width = 15
        timePass = 0
        timeLeft.innerHTML = timePass
        topScore = 0
        gameOver = true
        border.id = 'space-border'
        grid.id = 'space-grid'
        topSpaceScore.innerHTML = 0
        console.log('game rendering')
    }



    //move shooter
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode){
            case 37:
                if (currentShooterIndex % width !== 0) currentShooterIndex -=1
                break
            case 39:
                if (currentShooterIndex % width < width -1) currentShooterIndex +=1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
   
    //move invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const righrEdge = alienInvaders[alienInvaders.length -1] % width === width -1

        if ((leftEdge && direction === -1) || (righrEdge && direction === 1)){
            direction = width
        } else if (direction === width){
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i =0; i<=alienInvaders.length -1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for (let i =0; i<=alienInvaders.length -1; i++){
            alienInvaders[i] += direction
        }
        for (let i =0; i<=alienInvaders.length -1; i++){
            if (!alienInvadersTakeDown.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    //gameover
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        alert('Game Over')
        spaceScore.textContent = 'Game Over'
        document.removeEventListener('keyup', shoot)
        document.removeEventListener('keydown', moveShooter)
        squares[currentShooterIndex].classList.remove('invader')
        squares[currentShooterIndex].classList.remove('shooter')
        squares[currentShooterIndex].classList.add('dead')
        clearInterval(invaderId)

    }
    for (let i = 0; i<=alienInvaders.length-1; i++){
        if(alienInvaders[i] > (squares.length - (width-1))){
            spaceScore.textContent = 'Game Over'
            document.removeEventListener('keyup', shoot)
            document.removeEventListener('keydown', moveShooter)
            clearInterval(invaderId)
            return alert('Game is Over')
        }
    }

    if (alienInvadersTakeDown.length >= alienInvaders.length){
        if (topScore < enemiesHitted + timePass){
            topScore = enemiesHitted + timePass
            topSpaceScore.innerHTML = `Finish in ${topScore} by ${currentPlayerName}`
        }
        spaceScore.textContent = 'You Win'
        alert('Good Job')
        clearInterval(invaderId)
        clearInterval(timerId)
        startBttn.textContent = 'Start'
        document.removeEventListener('keyup', shoot)
        document.removeEventListener('keydown', moveShooter)
        fetchNewRecord(enemiesHitted+timePass, currentPlayer.id, currentGame.id)

        }
    }

    //laser function
    function shoot(e){
        let laserId 
        let currentLaserIndex = currentShooterIndex
        //move laser
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if (squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 250)
                clearInterval(laserId)

                const alienTakeDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakeDown.push(alienTakeDown)
                enemiesHitted ++
                spaceScore.textContent = enemiesHitted
            }
            if (currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 250)
            }
        }
        switch(e.keyCode){
            case 38:
                laserId = setInterval(moveLaser, 100)
            break
        }  
    }

    //timer
    function timerUp(){
    timePass++
    timeLeft.textContent = timePass
    }

    //destroy all created div
    function destroySpace(){
    while (grid.firstChild) {
        console.log('destroying divs')
        grid.removeChild(grid.lastChild);
      }
      squares = undefined
    }
   
    //start-pause
    function startSpace(){
    if (startBttn.textContent === 'Pause'){
        clearInterval(invaderId)
        clearInterval(timerId)
        document.removeEventListener('keyup', shoot)
        document.removeEventListener('keydown', moveShooter)
        startBttn.textContent = 'Start'
    } else if (startBttn.textContent === 'Start'){
        invaderId = setInterval(moveInvaders, 250)
        timerId = setInterval(timerUp, 1000)
        document.addEventListener('keyup', shoot)
        document.addEventListener('keydown', moveShooter)
        startBttn.textContent = 'Pause'
    }

    }
    //reset
    function resetSpace(){
        clearInterval(invaderId)
        clearInterval(timerId)
        enemiesHitted = 0
        spaceScore.textContent = enemiesHitted
        currentShooterIndex = 202
        direction = 1
        currentInvaderIndex = 0
        alienInvadersTakeDown = []

        for (let i =0; i<alienInvaders.length -1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
            console.log('remove')
        }
        alienInvaders = [
            0,1,2,3,4,5,6,7,8,9,
            15,16,17,18,19,20,21,22,23,24,
            30,31,32,33,34,35,36,37,38,39
        ]
        squares.forEach(index => index.classList.remove('invader'))
        squares.forEach(index => index.classList.remove('shooter'))
        squares.forEach(index => index.classList.remove('laser'))
        squares.forEach(index => index.classList.remove('boom'))
        squares.forEach(index => index.classList.remove('dead'))
        alienInvaders.forEach (invader => squares[currentInvaderIndex + invader].classList.add('invader'))
        squares[currentShooterIndex].classList.add('shooter')
        document.addEventListener('keyup', shoot)
        document.addEventListener('keydown', moveShooter)
        invaderId = setInterval(moveInvaders, 250)
        timerId = setInterval(timerUp, 1000)
        timePass = 0
        timeLeft.textContent = timePass
        startBttn.textContent = 'Pause'
    }

    //exit game
    function exitSpace(){
        console.log('exit pressed')
        resetSpace()
         gameOver = true
         clearInterval(invaderId)
         clearInterval(timerId)
         enemiesHitted = 0
         molesScore.textContent = enemiesHitted
         topScore = 0
         currentTime = 30
         startBttn.textContent = 'Start'
         destroySpace()
         hideGame()
         currentGame = undefined
         startBttn.removeEventListener('click', startSpace)
         resetBttn.removeEventListener('click', resetSpace)
         exitBttn.removeEventListener('click', exitSpace)
    };
