
var zombie , zombie_running,zombie_collided;
var coin , obstacle, obstacleImage, batImage;
var ground;
var coinGroup, obstacleGroup;
var score=0;
var score=0;
var play=1;
var end=0;
var gameState=play;
var restart,restartIma;
var gameover,gameoverIma;
var bFlag = false;

function preload()
{
  
  jumpSound = loadSound("assets/sounds/jump.wav");
  collidedSound = loadSound("assets/sounds/collided.wav");
  coinSound = loadSound("assets/sounds/coin.wav");
  
  bgWhite = loadImage("assets/bgwhite.png");
  backgroundImg = loadImage("assets/bg.png");
  groundImg = loadImage("assets/ground.png");
  
  trex_running = loadAnimation("assets/trex1.png","assets/trex3.png","assets/trex4.png"); 
  trex_collided = loadAnimation("assets/trex_collided.png"); 
  zombie_running = loadAnimation("assets/Zombie-01.png","assets/Zombie-02.png","assets/Zombie-03.png","assets/Zombie-04.png"); 
  zombie_jumping = loadAnimation("assets/Zombie-06.png","assets/Zombie-07.png","assets/Zombie-08.png","assets/Zombie-07.png");
  zombie_collided = loadAnimation("assets/Zombie-10.png");
  
  groundImage = loadImage("assets/ground.png");
  
    
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  //obstacle5 = loadImage("assets/obstacle5.png");
  

  coin1 = loadImage("assets/coin1.png");
  coin2 = loadImage("assets/coin2.png");
  
  batImage = loadImage("assets/bat.png");

  gameoverImg = loadImage("assets/gameoverpt.png");
  restartImg = loadImage("assets/restartpt.png");

}



function setup() 
{
  createCanvas(600, 400);

  bg=createSprite(300,100);  
  bg.addImage("bgWhite",bgWhite);
  bg.addImage("bgImage",backgroundImg);
  bg.velocityX = -4;
  bg.scale = 0.9; 
  
  zombie=createSprite(50,10);
  zombie.addAnimation("trex_running",trex_running); 
  zombie.addAnimation("trex_collided",trex_collided); 

  zombie.addAnimation("running",zombie_running);
  zombie.addAnimation("jumping",zombie_jumping);
  zombie.addAnimation("collided",zombie_collided);
  
  zombie.scale=0.5;

  ground=createSprite(300,385,600,10);  
  ground.scale = 0.5;
  ground.addImage("ground",groundImg);

  invGround=createSprite(300,399,600,5);  
  invGround.visible = false;
 

 
  obstacleGroup = createGroup();
  coinGroup = createGroup();
  batGroup= createGroup();
  
  gameover=createSprite(300,120);
  gameover.addImage("gameover",gameoverImg);
  gameover.visible=false;
  //gameover.scale = 0.8;
  
  restart=createSprite(300,300);
  restart.addImage("restart",restartImg);
  //restart.scale=0.8;
  restart.visible=false;
}


function draw() 
{
  background(255);
  
  if(gameState===play)
    {
      ground.velocityX = -6;
      if(bFlag){
        zombie.changeAnimation("running",zombie_running);
      }
      else{
        zombie.changeAnimation("trex_running",trex_running);
      }
      if (ground.x < 0)
        {
          ground.x = ground.width/2;
          bg.x = ground.width/2;
        }
        
      if (keyDown("space") && zombie.y >= 335)
        {
          zombie.velocityY=-15;
          jumpSound.play();
        }
        zombie.velocityY=zombie.velocityY+0.8;
            
      spawnObstacles();
      spawnCoins();
      spawnBats();
      
      if(zombie.isTouching(coinGroup))
        {
          for (var i = 0; i < coinGroup.length; i++) {
            if (coinGroup.get(i).isTouching(zombie)) {
              coinGroup.get(i).destroy();
                score = score + 1;
                coinSound.play();
            }
          }
        }
  
      if(zombie.isTouching(obstacleGroup))
        {
          gameState=end;
          bg.velocityX=0;
          ground.velocityX=0;
          collidedSound.play();
         
        }
      
    
      //survivalTime=Math.ceil(frameCount/frameRate());
    }
  
  else if(gameState===end)
    {
      obstacleGroup.setVelocityXEach(0);
      batGroup.destroyEach(0);
      coinGroup.destroyEach();      
      obstacleGroup.setLifetimeEach(-1);
      
      ground.velocityX=0;
      bg.velocityX=0;
      zombie.velocityY=0;
      
      gameover.visible=true;
      restart.visible=true;
      if(bFlag){
        zombie.changeAnimation("collided",zombie_collided);
      }
      else{
        zombie.changeAnimation("trex_collided",trex_collided);
      }
     
      
      if(mousePressedOver(restart)) 
      {
        reset();
      }
    }
  
    zombie.collide(invGround); 
  
  drawSprites();
    
  stroke="white";
  textSize(15);
  fill("black");
  
  text("Pontua????o : "+score,500,25);
  text("Pressione setas para CIMA e para BAIXO para os truques de Halloween!! ",2,25);
  
}

function spawnObstacles()
{
 if (frameCount % 150 === 0)
 {
    obstacle = createSprite(600,365,10,40);
    obstacle.velocityX = -6;
    //gerar obst??culos rand??micos
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: 
            obstacle.addImage(obstacle4);
            break;
    }
            
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle",0,0,30,obstacle.height);
    obstacleGroup.add(obstacle);
 }
}

function spawnCoins() 
{
  if (frameCount % 90 === 0) {
    coin = createSprite(600,Math.round(random(170,300)),40,10);
    
    coin.setCollider("rectangle",0,0,40,coin.height);
    coin.velocityX = -6;
    coin.lifeTime=300;

    //gerar moedas aleat??rias
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: coin.addImage(coin1);
              break;
      case 2: coin.addImage(coin2);
              break;
      default: break;
    }
    coin.scale = 0.1;
    coinGroup.add(coin);
  }
}

function spawnBats() 
{
  if (frameCount % 75 === 0) {
    bat = createSprite(600,Math.round(random(10,200)),40,10);
    
    bat.velocityX = Math.round(random(-3,-7));
    bat.lifeTime=300;
    bat.addImage(batImage);
    
    bat.scale = 0.1;
    batGroup.add(bat);
  }
}

function reset()
{
  frameCount=0;
  gameState=play;
  gameover.visible=false;
  restart.visible=false;
  score=0;
  
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  bg.velocityX = -2;
  ground.velocityX = -2;

  if(bFlag){
    zombie.changeAnimation("collided",zombie_collided);
  }
  else{
    zombie.changeAnimation("trex_collided",trex_collided);
  }
}



function keyPressed(){
  if(keyCode === 38){
    zombie.changeAnimation("running", zombie_running)
    bFlag = true;
  }
  if(keyCode === 40){
    bg.changeImage("bgImage",backgroundImg);
  }
}