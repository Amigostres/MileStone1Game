const gameContainer = document.querySelector("#game")
gameContainer.addEventListener(`click`, (e) => {
    //creates the snowball
    const snowball = document.createElement('img')
    snowball.src = 'assets/SnowBall.png'
    snowball.className = 'snowBall'
    snowball.setAttribute('draggable', 'false')
    snowball.style.top = '360px'
    snowball.style.left = '30px'
    gameContainer.appendChild(snowball)
    

    //get the mouse location
    const targetX = e.clientX
    console.log(`x: ${targetX}`);
    const targetY = e.clientY
    console.log(`y: ${targetY}`);

    //get the slope
    //get rise
    let rise = targetY - 360
    let run = targetX - 30
    let slope = rise/run
    console.log(slope);
    //the end of the page
    const endX = 600
    
    //linear equation
    // y = mx + b
    let endY = (endX * slope) + 360

    const distance = Math.sqrt(endX ** 2 + endY ** 2)
    const speed = distance / 10500; // adjust this value to change the animation duration


    let intervalId = setInterval(() => {

        const snowballX = parseFloat(snowball.style.left) // parseInt is to get rid of the 'px'
        const snowballY = parseFloat(snowball.style.top)
        const deltaX = (endX - snowballX) * speed //delta = (mouselocation - starting) * duration
        const deltaY = (endY - snowballY) * speed
  
        snowball.style.left = `${snowballX + deltaX}px`
        snowball.style.top = `${snowballY + deltaY}px`

        if (snowballX >= 560 || snowballY >= 500) { // I don't want the snowball to go under so I delete iti f it does
            console.log(`out of the div`);
            clearInterval(intervalId) // stops interval 
            gameContainer.removeChild(snowball) // deletes the snowball
          }
      }, 30)

})