"use strict";
const gameContainer = document.querySelector("#game");
const snowMan = document.getElementById('snowMan');
const audioPool = [];
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
    if (Zombies.count < 5 && .3 > (Math.random() + .1)) {
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
setInterval(() => {
    zombieInstances.forEach((zombieInstance, index) => {
        // Get the corresponding DOM element for the zombie instance
        const zombieElement = document.querySelector(`.Zombie[id="ZomID=${zombieInstance.instanceId}"]`);
        if (!zombieElement) {
            return; // Return if element doesn't exist
        }
        const currentLeftPosition = parseFloat(zombieElement.style.left);
        // If zombie is out of the screen on the left, remove it from the DOM and the array
        if (currentLeftPosition + zombieElement.clientWidth < 0) {
            gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.removeChild(zombieElement);
            zombieInstances.splice(index, 1); // Remove the zombie from the instances array
            return;
        }
        // Otherwise, update its position
        zombieElement.style.left = (currentLeftPosition + zombieInstance.speed) + "px";
        let zombieRect = zombieElement.getBoundingClientRect();
        // time to check if there is a snow ball in this zombie instace
        // if snowball is in a zombie it will disapear
        //I think i might move this entire code block into the snowball block to hit detection
        if (intersectRect(zombieRect, 0) //0 is just a place holder and this function 
        //just checks if the gameRect is colliding with another rect
        ) { }
    });
}, 30);
gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.addEventListener(`click`, (e) => {
    let gameRect = gameContainer.getBoundingClientRect();
    // console.log(gameRect); // this is to deal with dynamic distance from flex box
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
    // console.log(`x: ${targetX}`);
    const targetY = e.clientY;
    // console.log(`y: ${targetY}`);
    //get the slope
    //get rise
    let rise = targetY - 360 - 15;
    let run = targetX - 30;
    let slope = rise / run;
    // console.log(slope);
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
        // const zombieRect = zombie.getBoundingClientRect()
        zombieInstances.forEach((zombieInstance, index) => {
            console.log(zombieInstance);
            const zombieElement = document.querySelector(`.Zombie[id="ZomID=${zombieInstance.instanceId}"]`);
            if (!zombieElement) {
                return; // Return if element doesn't exist
            }
            let zombieRect = zombieElement === null || zombieElement === void 0 ? void 0 : zombieElement.getBoundingClientRect();
            // if snowball is in a zombie it will disapear
            //I think i might move this entire code block into the snowball block to hit detection
            if (intersectRect(snowballRect, zombieRect)) { // this will check if 
                // console.log('Hit!')
                clearInterval(intervalId); // stops interval 
                zombieInstance.health -= 5;
                console.log('hit');
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
            // console.log(`out of the div`)
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
