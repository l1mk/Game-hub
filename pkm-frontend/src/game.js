class Game {
    constructor(argument){
        console.log('new game class been created', argument)
        this.title = argument.title
        this.records = argument.records
        this.created = argument.created_at
        this.id = argument.id
        }
}