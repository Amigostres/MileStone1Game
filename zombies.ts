class Zombies{

    static count: number = 0

    //declaring variable ahead of time with their datatypes
    public health: number;
    public damage: number;
    public src: string;
    public instanceId: number;
    public height: string;
    public top: number;
    public left: number;
    public speed: number;
    public knockbackVelocity: number;

    constructor() {
        
        this.health = 20
        this.damage = 5
        this.src = ("assets/gifs/transparentZombieAnimation.gif")
        //each time there is a new instace it increments the class count
        this.instanceId = ++Zombies.count
        this.height = '150px'
        this.top = 370
        this.left = 450
        this.speed = -2 // negative because I want it to go to the left of the position
        this.knockbackVelocity = 0
    }

    spawn(){
        // top: 370px;
        // left: 450px;


    }
    hurt(slope: number){
        console.log('zombie thrown at this slope', slope);
        this.knockbackVelocity = 5 * Math.sign(slope)
        //I want to change zombie gif if possible when the zombie instance is hurt
    }

}