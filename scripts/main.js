// Creation of the canvas
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

// background
let velocity = 2
let speedBg = 0

function backgroundSpeed() {
    speedBg += 1 * velocity
    canvas.style.backgroundPosition = `center ${speedBg}px`

    if (speedBg >= 100000) {
        speedBg = 0
    }

    setTimeout(backgroundSpeed, 2)
}
backgroundSpeed()


//ship declaration
let shipReady = false
const shipImage = new Image()
shipImage.onload = function (){
  shipReady = true
}
shipImage.src = "textures/ship.png"
const ship = {
  x : canvas.width / 2,
  y : canvas.height - 200,
  speed : 500,
  width : 150,
  height : 150
}

//enemies
let enemyReady = false
const enemyImage = new Image()
enemyImage.onload = function (){
  enemyReady = true
}
enemyImage.src = "textures/enemy.png"
const enemy = {
  x : Math.random()* (canvas.width - 150) + 10,
  y : -150,
  speed : 500,
  width : 150,
  height : 150
}

const moveEnemies = function (){
  if(enemy.y < canvas.height){
    enemy.y += 5
    console.log(enemy.y)
  }
}

//input player
const keysDown = {}

addEventListener("keydown", function (event) {
	keysDown[event.keyCode] = true
}, false)

addEventListener("keyup", function (event) {
	delete keysDown[event.keyCode]
}, false)

const update = function (modifier) {
	if ((38 in keysDown || 90 in keysDown) && ship.y > 0) { // Player holding up arrow
    ship.y -= ship.speed * modifier
    shipImage.src = "textures/ship-speed.png"
    setTimeout(()=>{
      shipImage.src = "textures/ship.png"
    }, 50)
	}
	if ((40 in keysDown || 83 in keysDown) && ship.y < canvas.height - ship.height) { // Player holding down arrow
		ship.y += ship.speed * modifier
	}
	if ((37 in keysDown || 81 in keysDown) && ship.x >= window.innerWidth * 0.2) { // Player holding left arrow
    ship.x -= ship.speed * modifier
    shipImage.src = "textures/ship-left.png"
    setTimeout(()=>{
      shipImage.src = "textures/ship.png"
    }, 50)
	}
	if ((39 in keysDown || 68 in keysDown) && ship.x <= window.innerWidth / 1.5) { // Player holding right arrow
    ship.x += ship.speed * modifier
    shipImage.src = "textures/ship-right.png"
    setTimeout(()=>{
      shipImage.src = "textures/ship.png"
    }, 50)
  }
  if (82 in keysDown && velocity <= 10) {
    console.log("speed");
    velocity += 0.1
  }
  if (69 in keysDown && velocity >= 1.5) {
    console.log("slow");
    velocity -= 0.1
  }
  if (66 in keysDown) {
    console.log("Barrel Roll");
    shipImage.src = "textures/ship-right.png"
    setTimeout(()=>{
      shipImage.src = "textures/ship-bottom.png"
    }, 60)
    setTimeout(()=>{
      shipImage.src = "textures/ship-left.png"
    }, 120)
    setTimeout(()=>{
      shipImage.src = "textures/ship.png"
    }, 180)
  }
}

//ship draw
const render = function(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
  if (shipReady){
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height)
  }
  if (enemyReady){
    ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height)
  }
}

const main = function () {
  let now = Date.now()
	let delta = now - then

  moveEnemies()
  update(delta / 1000)
  render()

  then = now

  requestAnimationFrame(main)
}

//Ressources for AnimationFrame for different browsers
const w = window
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

let then = Date.now()
main()


const scored = document.querySelector('.score')

let scoreJs = 0

function score() {
  scoreJs = Math.floor(scoreJs + (1 * velocity))
  scored.innerHTML = "Score: " + scoreJs
  requestAnimationFrame(score)
}

score()