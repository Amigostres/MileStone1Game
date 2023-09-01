"use strict";
class Zombies {
    constructor() {
        this.health = 20;
        this.damage = 5;
        this.src = ("assets/gifs/transparentZombieAnimation.gif");
        //each time there is a new instace it increments the class count
        this.instanceId = ++Zombies.count;
        this.height = '150px';
        this.top = 370;
        this.left = 450;
        this.speed = -1;
    }
    spawn() {
        // top: 370px;
        // left: 450px;
    }
    hurt(damage) {
        console.log('hit Zombie. Current health:', this.health);
        //I want to change zombie gif if possible when the zombie instance is hurt
    }
}
Zombies.count = 0;
