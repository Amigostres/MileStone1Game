"use strict";
const gameContainer = document.querySelector("#game");
let snowMan = document.getElementById('snowMan');
const audioPool = [];
let isGameOver = false;
const initialVelocity = 10;
const knockbackDeceleration = .5;
// create audio elements and add them to the audio pool
for (let i = 0; i < 5; i++) {
    const audio = new Audio('assets/thrownSnoballSound.mp3');
    audioPool.push(audio);
}
let audioIndex = 0;
let zombieInstances = [];
let zombieRect = [];
//spawn zombie once a few seconds
setInterval(() => {
    //when there are less than 5 zombies give a 1/3 chance of spawning one every second
    //and while snowGolem is alive
    if (Zombies.count < 5 && .3 > (Math.random() + .1) && snowMan) {
        let zombie = new Zombies();
        zombieInstances.push(zombie);
        //creating the zombie element with image element
        const zombieElement = document.createElement('img');
        zombieElement.src = zombie.src;
        // zombieElement.id = zombie.instanceId.toString()
        zombieElement.setAttribute('id', `ZomID=${zombie.instanceId.toString()}`);
        zombieElement.setAttribute('draggable', 'false');
        zombieElement.className = 'Zombie';
        zombieElement.style.top = zombie.top + 'px'; // Set the top position of the zombie element
        zombieElement.style.left = zombie.left + 'px'; // Set the left position of the zombie element
        gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.append(zombieElement);
        // console.log(zombieInstances)
    }
    else {
        // console.log('zombie did not spawn')
    }
}, 1000);
//here this changes the movement of the zombie
setInterval(() => {
    zombieInstances.forEach((zombieInstance, index) => {
        // Get the corresponding DOM element for the zombie instance
        const zombieElement = document.querySelector(`.Zombie[id="ZomID=${zombieInstance.instanceId}"]`);
        if (!zombieElement) {
            return;
        } //for typeScript's sake
        let currentLeftPosition = parseFloat(zombieElement.style.left);
        let currentTopPosition = parseFloat(zombieElement.style.top);
        // If zombie is out of the screen on the left, remove it from the DOM and the array
        if (currentLeftPosition + zombieElement.clientWidth < 0) {
            gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.removeChild(zombieElement);
            zombieInstances.splice(index, 1); // Remove the zombie from the instances array
            return;
        }
        //to Do:
        //when the damage is done with the run method move the zombie to the air by adding the y-axis
        //when now make it fall to a floor
        //370px is the floor "I think"
        //as long the zombie is in the air it will continue to fall
        if (currentTopPosition < 375 && zombieInstance.gravity == true) {
            zombieElement.style.top = currentTopPosition + 5 + 'px';
            currentTopPosition = parseFloat(zombieElement.style.top);
        }
        if (zombieInstance.damageTaken === true) {
            zombieElement.style.top = currentTopPosition - 30 + 'px';
            currentTopPosition = parseFloat(zombieElement.style.top);
        }
        zombieElement.style.left = (currentLeftPosition + zombieInstance.speed) + "px";
        if (snowMan) {
            //getting zombie and snowGolem BoundingRect
            let snowGolemRect = snowMan.getBoundingClientRect();
            let zombieRect = zombieElement.getBoundingClientRect();
            //if zombie and snowgolem are touching
            if (zombieRect.left < snowGolemRect.right) {
                console.log('game over');
                snowMan.remove();
                snowMan = null;
                isGameOver = true;
                return;
            }
        }
    });
}, 30);
gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.addEventListener(`click`, (e) => {
    //don't even to run if the game is over
    if (isGameOver) {
        return;
    }
    // this is to deal with dynamic distance from flex box
    let gameRect = gameContainer.getBoundingClientRect();
    //if snowGolem is ALive then you can shoot
    //creates the snowball
    const snowball = document.createElement('img');
    snowball.src = 'assets/SnowBall.png';
    snowball.className = 'snowBall';
    snowball.setAttribute('draggable', 'false');
    snowball.style.top = 360 + 'px'; //360px 
    snowball.style.left = `30px`; //30px
    gameContainer.appendChild(snowball);
    audioPool[audioIndex].currentTime = 0;
    audioPool[audioIndex].play();
    audioIndex = (audioIndex + 1) % audioPool.length;
    //get the mouse location
    //e.clientX is absolute so we make it relative by substracting gameRect.x
    const targetX = e.clientX - gameRect.x;
    const targetY = e.clientY;
    //get the slope
    //get rise
    let rise = targetY - 360 - 15;
    let run = targetX - 30;
    let slope = rise / run;
    // console.log(slope)
    //the end of the page
    const endX = gameContainer.clientWidth;
    //linear equation
    // y = mx + b
    let endY = (endX * slope) + 360;
    // const distance = Math.sqrt(endX ** 2 + endY ** 2)
    const speed = 30; // adjust this value to change the animation duration
    let intervalId = setInterval(() => {
        let snowballX = parseFloat(snowball.style.left); // parseInt is to get rid of the 'px'
        let snowballY = parseFloat(snowball.style.top);
        const deltaX = (endX - snowballX) / Math.sqrt((endX - snowballX) ** 2 + (endY - snowballY) ** 2) * speed;
        const deltaY = (endY - snowballY) / Math.sqrt((endX - snowballX) ** 2 + (endY - snowballY) ** 2) * speed;
        snowball.style.left = `${snowballX + deltaX}px`;
        snowball.style.top = `${snowballY + deltaY}px`;
        // check for intersection with zombie
        const snowballRect = snowball.getBoundingClientRect();
        zombieInstances.forEach((zombieInstance, index) => {
            const zombieElement = document.querySelector(`.Zombie[id="ZomID=${zombieInstance.instanceId}"]`);
            if (!zombieElement) {
                return; // Return if element doesn't exist
            }
            let zombieRect = zombieElement === null || zombieElement === void 0 ? void 0 : zombieElement.getBoundingClientRect();
            // if snowball is in a zombie it will disapear
            //I think i might move this entire code block into the snowball block to hit detection
            //turns it into a num so it's easier to work with
            const currentLeftPosition = parseFloat(zombieElement.style.left);
            if (intersectRect(snowballRect, zombieRect)) { // this will check if snowBall and zombie collide
                clearInterval(intervalId); // stops interval 
                zombieInstance.health -= 5;
                //todo: when hurt
                //make zombie start at a high velocity moving to the right
                //then start deccelerating instanly
                //knockback direction uses the snowball slope
                zombieInstance.hurt(1);
                console.log(zombieInstance.health);
                gameContainer.removeChild(snowball); // deletes the snowball
                if (zombieInstance.health <= 0) {
                    console.log(`it's DEAD!!`);
                    gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.removeChild(zombieElement);
                    zombieInstances.splice(index, 1); // Remove the zombie from the instances array
                    return;
                }
            }
        });
        if (snowballX >= endX - 30 || snowballY >= 465) { // I don't want the snowball to go under so I delete iti f it does
            clearInterval(intervalId); // stops interval 
            gameContainer.removeChild(snowball); // deletes the snowball
        }
    }, 30);
});
function intersectRect(rect2, rect1) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}
