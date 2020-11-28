
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground,r;

var PLAY=1,END=0,FIRST=2;
var gamestate=FIRST;

function preload(){
  
  
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
 
  
  
}



function setup() {
  
 
  
   monkey=createSprite(100,309.3,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  foodGroup=createGroup();
obstacleGroup=createGroup();
  
   ground=createSprite(200,350,400,20);
  
}


function draw() {

  background("white");
  textSize(30);
  text("Score:" + score,150,100)
  console.log(monkey.y);
  if(gamestate===PLAY) 
  {
  
  bananas();
  obstacles();
  
  if(foodGroup.isTouching(monkey)) {
  foodGroup.destroyEach();
    score=score+1;
  }
  
      if(keyDown("space") && monkey.y>=309.3) {
    monkey.velocityY=-15;
  }
     monkey.velocityY=monkey.velocityY+0.8;
    
    
  if(obstacleGroup.isTouching(monkey)) {
    
    gamestate=END;
   
  }
  
  }
  
  if(gamestate===END) {
     foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
     obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    text("Press R to start", 100,200)
    if(keyDown("r")) {
      gamestate=PLAY;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
      
  score=0;
 // trex.changeAnimation("running",trex_running);
  
     
    }
  }
  if(gamestate===FIRST) {
    if(keyDown("r")) {
      gamestate=PLAY;
      
  }
    text("Press R to start", 100,200)
    text("Press space to jump", 80,250)
  }
  
  monkey.collide(ground);
  
 
  drawSprites();
}

function bananas() {
  if(frameCount % 80 ===0) {
    banana=createSprite(400,200,20,20);
    banana.velocityX=-5;
  banana.addImage(bananaImage);
  banana.scale=0.1;
    banana.y=Math.round(random(275,100));
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 200===0) {
     obstacle=createSprite(400,320,40,30)
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle)
  }
}




