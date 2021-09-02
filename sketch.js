var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var coin, coinImage;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadImage("Player.png");
  //trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("Background.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Shark.png");
  // obstacle2 = loadImage("Enemy.png");
  // obstacle3 = loadImage("obstacle3.png");
  // obstacle4 = loadImage("obstacle4.png");
  // obstacle5 = loadImage("obstacle5.png");
  // obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  coinImage = loadImage("Coins.png");

}

function setup() {
  createCanvas(700, 300);
  
  trex = createSprite(50,180,20,50);
  
  trex.addImage("running", trex_running);
  // trex.addAnimation("collided", trex_collided);
  trex.scale = 0.2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("white");
 

   //ground.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //ground.depth = score.depth;

    //score.depth = score.depth + 1;
  

     var a=text("Score: "+ score, 500,50);
    //ground.depth = a.depth;

     a.depth=a.depth+1
  
  if (gameState===PLAY){
    // score = score + Math.round(getFrameRate()/60);
    // ground.velocityX = -(6 + 3*score/100);
  
    // if(keyDown("space") && trex.y >= 159) {
    //   trex.velocityY = -12;
    // }

  
    // trex.velocityY = trex.velocityY + 0.8
    trex.y = mouseY;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    // spawnClouds();
    spawnObstacles();
    spawnCoins();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
    if(trex.isTouching(coinsGroup)){
      score = score + 1;
  
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0)    
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    // cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 260 === 0) {
    var obstacle = createSprite(600,200,40,10);
    obstacle.y = Math.round(random(80,120));
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
     obstacle.lifetime = 200;
    
    //adjust the depth
    //obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
  
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,200,40,10);
    coin.y = Math.round(random(20,270));
    coin.addImage(coinImage);
    coin.scale = 0.2;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
     coin.lifetime = 160;
    
    //adjust the depth
    
    coin.depth = coin.depth + 1;
    coinsGroup.add(coin)
    
    //add each cloud to the group
   // obstaclesGroup.add(obstacle);

    if(trex.isTouching(coin)){
      score = score + 1;
      coin.visible=false
    }
   }
  
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  
  // trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}