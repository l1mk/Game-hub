document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    const timer = document.querySelector('#timer')
    const top = document.querySelector('#top')
    const startBttn = document.querySelector('#start-pause')
    const resetBttn = document.querySelector('#reset')
    const instBtn = document.querySelector('#inst-Btn')
    const instruction = document.querySelector('#instructions')
    let time = 0
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvadersTakeDown = []
    let result = 0
    let direction = 1
    let topScore = 0
    let invaderId

    //define alien
    let alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //draw aliens
    alienInvaders.forEach (invader => squares[currentInvaderIndex + invader].classList.add('invader'))

    //draw shooter
    squares[currentShooterIndex].classList.add('shooter')

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
        time ++
        timer.textContent = time

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
        resultDisplay.textContent = 'Game Over'
        squares[currentShooterIndex].classList.remove('invader')
        squares[currentShooterIndex].classList.remove('shooter')
        squares[currentShooterIndex].classList.add('dead')
        clearInterval(invaderId)
        time = 0
        timer.textContent = time
    }
    for (let i = 0; i<=alienInvaders.length-1; i++){
        if(alienInvaders[i] > (squares.length - (width-1))){
            resultDisplay.textContent = 'Game Over'
            clearInterval(invaderId)
            time = 0
            timer.textContent = time
        }
    }

    if (alienInvadersTakeDown.length >= alienInvaders.length){
        resultDisplay.textContent = 'You Win'
        alert('Good Job')
        clearInterval(invaderId)
        document.removeEventListener('keyup', shoot)
        document.removeEventListener('keydown', moveShooter)
        if (topScore < time){
            topScore = time
            top.innerHTML = `Finish in ${topScore} Seconds by Player1`
        }

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
                result ++
                resultDisplay.textContent = result
            }
            if (currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 250)
            }
        }
        switch(e.keyCode){
            case 32:
                laserId = setInterval(moveLaser, 100)
            break
        }  
    }
    //timer set
    //invaderId = setInterval(moveInvaders, 500)
   
//start-pause
function start(){
    if (startBttn.textContent === 'Pause'){
        clearInterval(invaderId)
        document.removeEventListener('keyup', shoot)
        document.removeEventListener('keydown', moveShooter)
        startBttn.textContent = 'Start'
    } else if (startBttn.textContent === 'Start'){
        invaderId = setInterval(moveInvaders, 250)
        document.addEventListener('keyup', shoot)
        document.addEventListener('keydown', moveShooter)
        startBttn.textContent = 'Pause'
    }

}
//reset
function reset(){
        clearInterval(invaderId)
        result = 0
        resultDisplay.textContent = result
        time = 0
        timer.textContent = time
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
        startBttn.textContent = 'Start'
    }

    startBttn.addEventListener('click', start)
    resetBttn.addEventListener('click', reset)
    instBtn.addEventListener('click', () =>{
        if (instBtn.innerHTML === 'Instructions'){
         instBtn.innerHTML = 'Hide'
         instruction.style.display = 'block'
        } else if (instBtn.innerHTML === 'Hide'){
         instBtn.innerHTML = 'Instructions'
         instruction.style.display = 'none'  
        }
     })
})