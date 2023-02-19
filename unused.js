//this is my first attempt

//const gameContainer = document.querySelector("#game")

// gameContainer.addEventListener(`click`,(e) => { // the event parameter is to get the mouse location 
//     let snowball = document.createElement('img')
//     snowball.src = 'assets/SnowBall.png'
//     snowball.className = "snowBall" //gives snowball a smaller size lol
//     snowball.setAttribute(`draggable`, `false`)
//     // snowball.style.position = "absolute"; // set the snowball's position to absolute so we can change the 

//     snowball.style.top = "390 px"
//     //let theY = parseInt(locationY) //this is to make the px into integers and git rid of the px at the end so we can incement it
//     //console.log(theY)  // to log it
//     snowball.style.left = "30px"
//     gameContainer.appendChild(snowball)
    
    

//     //get mouse location function
 
//     let x = e.clientX;    // Get the horizontal coordinate of the mouse pointer
//     let y = e.clientY;     // Get the vertical coordinate of the mouse pointer
//     //console.log('Mouse location: ' + x + ', ' + y)


//     //I want the shot to move every 10px or something
//     // setInterval(moveToLocation, 50)

//     // function moveToLocation() {
//     //     if(x > locationX){
//     //         let theX = parseInt(locationX)
//     //         theX += 20
//     //         console.log(theX);
//     //     }
//     // }
//     snowball.style.top = `${y - snowball.width/2}px` //the width/2 is so that the snowball is centered at the mouse insted of the top left
//     snowball.style.left = `${x - snowball.height/2}px`//the height/2 is so that the snowball is centered at the mouse insted of the top left


// })