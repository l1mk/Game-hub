// class to render the current time

class Score {
    constructor(argument){
        console.log('new score class been created', argument)
    this.score = argument.score
    this.player = argument.player
    this.game = argument.game
    this.created = argument.created_at
    this.id = argument.id
    console.log(this.player, this.game)
    this.render(this.score)
    }
    //score rendering
    render(score){
        console.log('rendering', score)
        let li = document.createElement('li')
        li.innerHTML = `${score} by ${this.player.name} in ${this.game.title}`
        ul.appendChild(li)
    }

}