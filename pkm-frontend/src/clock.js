// class to render the current time
class CurrentTime {
    constructor(targetId){
    this.targetEl =  document.getElementById(targetId)
    this.targetEl.innerHTML = this.render()

    setInterval(() => {
        this.targetEl.innerHTML = this.render()
    }, 1000);
    }
    //clock rendering
    render(){
        const currentTime = new Date().toLocaleTimeString()
        return `Time is ${currentTime}`
    }

}
