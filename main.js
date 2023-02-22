const gameContainer = document.querySelector("#game")

gameContainer.addEventListener('click', (e) => {
    //creates the snowball
    const snowball = document.createElement('img')
    snowball.src = 'assets/SnowBall.png'
    snowball.className = 'snowBall'
    snowball.setAttribute('draggable', 'false')
    snowball.style.top = '360px'
    snowball.style.left = '30px'
    gameContainer.appendChild(snowball)
  
    //getting mouse location
    const x = e.clientX 
    const y = e.clientY 

    //using the Pythagorean theorem we the the distance from location (30,360) to mouse location
    const distance = Math.sqrt((x) ** 2 + y ** 2)
    // console.log(`distance:${distance}`)
    const speed = distance / 10500; // adjust this value to change the animation duration
    // console.log(`speed:${speed}`)
    const increment = 600 // this is so that it 100% goes off
    //note this does not help lol

    let intervalId = setInterval(() => {
      const snowballX = parseInt(snowball.style.left) // parseInt is to get rid of the 'px'
      const snowballY = parseInt(snowball.style.top)
      const deltaX = (x - snowballX) * speed //delta = (mouselocation - starting) * duration
      const deltaY = (y - snowballY) * speed

      




      snowball.style.left = `${snowballX + deltaX}px`
      snowball.style.top = `${snowballY + deltaY}px`
      //while snowball's x is still in the screen It won't delete it
      console.log(x);
      console.log(y);
      console.log(`snowball ${snowballX}, ${snowballY}`);
      console.log(`delta:${deltaX}, ${deltaY}`);
      if (snowballX >= 600 || snowballY >= 500) { // I don't want the snowball to go under so I delete iti f it does
        console.log(`out of the div`);
        clearInterval(intervalId) // stops interval 
        gameContainer.removeChild(snowball) // deletes the snowball
      }
    }, 10)
  })