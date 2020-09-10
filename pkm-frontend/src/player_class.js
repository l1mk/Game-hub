class Player {
    constructor(argument){
        console.log('new user been created', argument)
    this.name = argument.name
    this.records = argument.records
    this.created = argument.created_at
    this.id = argument.id
    this.render()
    }
    //player rendering
    render(){
        console.log('rendering', this.name)
        const playerName = document.getElementById('player-name');
        console.log(playerName)
        playerName.innerHTML = capitalize(this.name)
    }
    //function declaration: player score update
  //  updatePlayer(record, id){
  //      console.log('updating')
  //      let configObj = {
  //          method: "PATCH",
  //          headers: {
  //            "Content-Type": "application/json",
  //            "Accept": "application/json"
  //          },
  //          body: JSON.stringify({
  //              "record": record
  //            })
  //        };
  //        return fetch(`http://localhost:3000/players/${id}`, configObj)
  //        .then(function(response) {
  //          return response.json();
  //        })
  //        .then(function(object) {
  //          console.log(object);
  //        })
  //        .catch(function(error) {
  //          alert("Error");
  //          document.body.innerHTML = error.message;
  //        });
  //  }

}