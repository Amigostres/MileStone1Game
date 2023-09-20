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
        this.speed = -2; // negative because I want it to go to the left of the position
        this.knockbackVelocity = 0;
        this.damageTaken = false;
        this.gravity = false;
    }
    spawn() {
        // top: 370px;
        // left: 450px;
    }
    //when hurt I want to try to change the speed to the oppiste direction and change it back after a set time
    hurt(slope) {
        console.log('zombie thrown back just like in the game', slope);
        this.speed = 30;
        this.damageTaken = true;
        setTimeout(() => {
            this.speed = -2;
            this.damageTaken = false;
            this.gravity = true;
        }, 100);
        return;
        //I want to change zombie gif if possible when the zombie instance is hurt
    }
}
Zombies.count = 0;
