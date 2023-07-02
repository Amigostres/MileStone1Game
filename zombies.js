class Zombies{

    static count = 0
    constructor(){
        this.health = 20
        this.damage = 5
        this.src = ("assets/gifs/transparentZombieAnimation.gif")
        this.instanceId = ++Zombies.count
    }

    spawn(gameContainer){
        const zombie = document.createElement('img')
        zombie.src = 'assets/gifs/transparentZombieAnimation.gif'
        zombie.setAttribute('draggable', 'false')
        gameContainer.appendChild(zombie)
    }
    hurt(){

    }

}