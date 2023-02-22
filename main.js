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
    console.log(`y: ${y}`);
    //calculate the slope
    const rise = y - 140

    const run = x - 30

    const slope = rise/run

    const riseB = slope * 570
    console.log(`riseB:${riseB}`);
    //x is always 600
    const endX = 600
    const endY = riseB * slope
    console.log(`endY: ${endY}`)




    //using the Pythagorean theorem we the the distance from location (30,360) to mouse location
    const distance = Math.sqrt(endX ** 2 + endY ** 2)
    // console.log(`distance:${distance}`)
    const speed = distance / 10500; // adjust this value to change the animation duration
    console.log(`speed:${speed}`)

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