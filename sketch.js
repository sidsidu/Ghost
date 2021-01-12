var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}
  
function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage("tower",towerImg)
  tower.velocityY=1
  
  spookySound.loop()
  
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.5
  
  doorG = new Group()
  climberG = new Group()
  invisibleG = new Group()
}
function draw (){
  background(0)
  
  if (gameState==="play"){
    
  
  if (tower.y > 400){
    tower.y=300
    
  }
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3
  }
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY = ghost.velocityY+0.8
  if (climberG.isTouching(ghost)){
    ghost.velocityY=0
  }
  if (invisibleG.isTouching(ghost)||(ghost.y>600)){
    ghost.destroy()
    gameState="end"
  }
  spawnDoor()
  drawSprites()
}
  if (gameState === "end"){
    stroke("yellow")
    textSize(30)
    text("Game Over",230,240)
  }
}
function spawnDoor(){
  
  if (frameCount % 240 === 0){
    door = createSprite(200,-50)
    door.addImage("door",doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY=1
    door.lifetime=800
    doorG.add(door)
    
    climber = createSprite(200,10)
    climber.addImage("climber",climberImg)
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime = 800
    climberG.add(climber)
    
    ghost.depth = door.depth
    ghost.depth+=1
    
    invisibleB=createSprite(100,10)
    invisibleB.x=door.x
    invisibleB.velocityY=1
    invisibleB.debug=true
    invisibleG.add(invisibleB)
    invisibleB.width = climber.width
    invisibleB.height = 2
  }
}
