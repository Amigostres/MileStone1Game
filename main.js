const gameContainer = document.querySelector("#game")
const zombie = document.querySelector(`.Zombie`) 
const snowMan = document.getElementById('snowMan')
const audioPool = []

// create audio elements and add them to the audio pool
for (let i = 0; i < 5; i++) {
    const audio = new Audio('assets/thrownSnoballSound.mp3')
    audioPool.push(audio)
}
let audioIndex = 0
let zombieEntity = new Zombies()
// console.log(zombieEntity.health);



gameContainer.addEventListener(`click`, (e) => {
    
    let gameRect = gameContainer.getBoundingClientRect()
    console.log(gameRect); // this is to deal with flex box


    //creates the snowball
    const snowball = document.createElement('img')
    snowball.src = 'assets/SnowBall.png'
    snowball.className = 'snowBall'
    snowball.setAttribute('draggable', 'false')
    snowball.style.top = `360px` //360px this is relative
    snowball.style.left = `30px` //30px
    gameContainer.appendChild(snowball)
    
    audioPool[audioIndex].currentTime = 0
    audioPool[audioIndex].play()
    audioIndex = (audioIndex + 1) % audioPool.length

    //get the mouse location
    //e.clientX is absolute so we make it relative by substracting gameRect.x
    const targetX = e.clientX - gameRect.x
    // console.log(`x: ${targetX}`);
    const targetY = e.clientY
    // console.log(`y: ${targetY}`);

    //get the slope
    //get rise
    let rise = targetY - 360
    let run = targetX - 30
    let slope = rise/run
    // console.log(slope);
    //the end of the page
    const endX = gameContainer.clientWidth 
    console.log(gameContainer.clientWidth);
    
    //linear equation
    // y = mx + b
    let endY = (endX * slope) + 360

    // const distance = Math.sqrt(endX ** 2 + endY ** 2)

    const speed = 30; // adjust this value to change the animation duration


    let intervalId = setInterval(() => {

        let snowballX = parseFloat(snowball.style.left) // parseInt is to get rid of the 'px'
        let snowballY = parseFloat(snowball.style.top)
        
        const deltaX = (endX - snowballX) / Math.sqrt((endX - snowballX)**2 + (endY - snowballY)**2) * speed
        const deltaY = (endY - snowballY) / Math.sqrt((endX - snowballX)**2 + (endY - snowballY)**2) * speed
  
        snowball.style.left = `${snowballX + deltaX}px`
        snowball.style.top = `${snowballY + deltaY}px`

        // check for intersection with zombie
        const snowballRect = snowball.getBoundingClientRect()
        const zombieRect = zombie.getBoundingClientRect()

        if (intersectRect(snowballRect, zombieRect)) { // this will check if 
            // console.log('Hit!')
            clearInterval(intervalId)   // stops interval 
            zombieEntity.health -= 5
            console.log(zombieEntity.health);
            gameContainer.removeChild(snowball) // deletes the snowball
            if(zombieEntity.health <= 0){
                console.log(`it's DEAD!!`);
                delete zombieEntity // this does not link to the one 
            }
        }
        


        if (snowballX >= endX - 30 || snowballY >= 465) { // I don't want the snowball to go under so I delete iti f it does
            // console.log(`out of the div`);
            clearInterval(intervalId) // stops interval 
            gameContainer.removeChild(snowball) // deletes the snowball
          }
      }, 30)

})





function intersectRect(rect2, rect1) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}
