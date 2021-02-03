var ground,groundImg,invisibleG;
var ball,ballImg;
var goal,goalsGroup,goalImg;
var start,startImg;
var score = 0;

var gameState = "play";
function preload(){
groundImg = loadImage("grass.png");
ballImg = loadImage("football.png");
goalImg = loadImage("goal.png");
}

function setup() {
  createCanvas(800,750);

  ground = createSprite(200,180,400,20);
  ground.velocityY = -2;
  ground.addImage(groundImg);
  ground.scale = 14;

  ball = createSprite(400,710,20,20);
  ball.addImage(ballImg);
  ball.scale = 4;

  invisibleG = createSprite(400,760,800,20);

  goalsGroup = new Group();
}

function draw() {
  background(0);
if(gameState === "play"){
  if(ground.y < 0){
 ground.y = ground.width/2;
}
 
 if(keyDown("left_arrow")){
   ball.x = ball.x -3;
 }

 if(keyDown("right_arrow")){
   ball.x = ball.x +3;
 }

 if(keyDown(UP_ARROW)){
   ball.velocityY -5;
 }

  //ball.velocityY = ball.velocityY + 0.8;
  
 // ball.collide(invisibleG);

  invisibleG.visible = false;

  if(ball.isTouching(goalsGroup)){
    score = score+2;
    reset();
    ball = ball.velocityY+1;
    ground = ball.velocity+1;
    goalsGroup.setVelocityYEach(2);

    if(score === 5){
      gameState = "over";
      stroke(255)
      textSize(30);
      fill(255);
      text("GAME OVER",400,100);
      text("PRESS 'R' TO RESTART THE GAME ",200, 200);
    }

    if (keyDown("r") && gameState === "over") {
    gameState = "play";
    score = 0;
  }
  }
}

   
 spawnGoal();
  drawSprites();
  
  stroke(255)
  textSize(30);
  fill(255);
  text("SCORE : " + score,400,50);
}

function spawnGoal(){
  if(frameCount % 250 === 0){
    goal = createSprite(700,-50,18,18);
    goal.addImage(goalImg);
    goal.velocityY = 3;
    goal.scale = 2;
    goal.lifetime = 250;
    goal.x = Math.round(random(10,800));
    goalsGroup.add(goal);
  }
}

function reset(){
  ball.x = 400;
  ball.y = 710;
  ball.scale = 4;
}