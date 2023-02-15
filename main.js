const gameContainer = document.querySelector("#game")

gameContainer.addEventListener(`click`,() => {let snowball = document.createElement('img')
snowball.src = 'assets/SnowBall.png'
snowball.className = "snowBall" //gives snowball a smaller size lol
// snowball.style.position = "absolute"; // set the snowball's position to absolute so we can change the 
snowball.style.top = "250px"
snowball.style.left = "20px" // these positions are so that the snowBall spawns on the snowman

gameContainer.appendChild(snowball)
})

