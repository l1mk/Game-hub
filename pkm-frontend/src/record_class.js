class Record {
    constructor(argument){
        console.log('new score class been created', argument)
    this.score = argument.score
    this.player = argument.player
    this.game = argument.game
    this.created = argument.created_at
    this.id = argument.id
    console.log(argument.player, 'is', this.player, argument.player_id)
    this.render(this.score)
    }
    //score rendering
    render(score){
        console.log('rendering', score)
        let li = document.createElement('li')
        if (this.player && this.game) {
            li.innerHTML = `${score} by ${this.player.name} in ${this.game.title}`
        } else {
            li.innerHTML = `${score} by ${currentPlayer.name} in ${currentGame.title}`
        }
        ul.appendChild(li)
    }
    //destroy all li
    static destroyScores(){
        while (ul.firstChild) {
            console.log('destroying li')
            ul.removeChild(ul.lastChild);
          }
    }

}