var player, endNPC, obstacleGroup;
var wall, ground, ground2;
var button, buttonIMG;
var gameState = 0;
var score = 0;

function preload(){
  buttonIMG = loadImage("restart.png");
}

function setup() {
  createCanvas(400,400);
  player = createSprite(200, 200, 30,30);
  player.shapeColor = "RED";

  endNPC = createSprite(1500,200,30,30);
  endNPC.shapeColor = "GREEN";
  
  wall = createSprite(1550,200,30,400);
  wall.visible = false;

  ground = createSprite(750,410,1500,20);
  ground2 = createSprite(750,-10,1500,20);

  //edges = createEdgeSprites();

  obstacleGroup = createGroup();
}

function draw() {
  background(128);  
  fill("BLACK");
  text("score: " + score, player.x+125, 25);
  if(gameState === 0){
    //player and camera movements, obstacle generating function, score

    score = player.x - 200;

    if(score < 0){
      score = 0;
    }

    if(keyIsDown(UP_ARROW)){
      player.y = player.y-5;
    }
    if(keyIsDown(DOWN_ARROW)){
      player.y = player.y+5;
    }
    if(keyIsDown(LEFT_ARROW)){
      player.x = player.x-2;
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.x = player.x+2;
    }
    
    camera.position.x = player.x;

    spawnObstacles();

    if(obstacleGroup.isTouching(player)){
      gameState = 1;
    }

    if(endNPC.isTouching(player)){
      gameState = 2;
      
    }
    
    player.collide(wall);
    player.collide(ground);
    player.collide(ground2);
  }
  if(gameState === 1){
    fill("BLACK");
    text("Game Over", player.x-25, player.y-30);

    obstacleGroup.setVelocityXEach(0);
  }
  if(gameState === 2){
    fill("BLACK");
    text("You win!", endNPC.x-25, endNPC.y-100);
  }

  drawSprites();
}

function spawnObstacles(){
if(frameCount % 50 === 0){
  var obsY = Math.round(random(30,400));
  obstacle = createSprite(player.x+250,obsY,25,25);
  obstacle.shapeColor = "WHITE";
  obstacle.velocityX = -(3+ score/200);
  //var rand = Math.round(random(1,2));

  /*if(rand === 1){
    obstacle 
    
  }*/
  obstacleGroup.add(obstacle);
  }
}

function restart(){
  gameState = 0;
  score = 0;

  obstacleGroup.destroyEach();

  player.x = 200;
  player.y = 200;
}