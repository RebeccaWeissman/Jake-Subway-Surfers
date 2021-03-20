var PLAY = 1;
var END = 0;
var gameState = 1;
var treasureCollection = 0;
var path;
var jake;
var coin;
var bomb;
var power;
var energy;
var rib;
var lib;

function preload() {
  //pre-load images
  pathAni = loadAnimation('path.png');
  jakeAni = loadAnimation('Jake1.png', 'Jake2.png', 'jake3.png', 'jake4.PNG', 'jake5.png');
  coinImg = loadImage('coin.png');
  bombImg = loadImage('bomb.png');
  energyImg = loadImage('energyDrink.png');
  powerImg = loadImage('power.png');
  gameOverImg = loadImage('game_over.png');
}

function setup() {
  createCanvas(320, 400);
  //path
  path = createSprite(160, 200, 400, 400);
  path.addAnimation('path', pathAni);
  path.velocityY = 8;
  //invible boundries
  lib = createSprite(10, 200, 30, 400);
  lib.visible = false
  rib = createSprite(350, 200, 100, 400);
  rib.visible = false
  //coin
  coin = createSprite(Math.round(random(20, 380)), 0, 10, 10);
  coin.addImage(coinImg);
  coin.scale = 0.34;
  coin.velocityY = 8;
  //bomb
  bomb = createSprite(Math.round(random(20, 380)), 0, 10, 10);
  bomb.addImage(bombImg);
  bomb.scale = 0.1;
  bomb.velocityY = 8;
  //power
  power = createSprite(Math.round(random(20, 380)), 0, 10, 10);
  power.addImage(powerImg);
  power.scale = 0.16;
  power.velocityY = 8;
  //energy Drink
  energy = createSprite(Math.round(random(20, 380)), 0, 10, 10);
  energy.addImage(energyImg);
  energy.scale = 0.14;
  energy.velocityY = 8;
  //Jake
  jake = createSprite(200, 310, 30, 30);
  jake.addAnimation('jake', jakeAni)
}

function draw() {
  background(0);
  drawSprites();
  text('Treasure: ' + treasureCollection, 350, 20);
  if (gameState == PLAY) {
    if (jake.isTouching(coin)) {
      treasureCollection = treasureCollection + 50;
      coin.destroy();
    }
    if (jake.isTouching(power)) {
      treasureCollection = treasureCollection + 150;
      power.destroy();
    }
    if (jake.isTouching(energy)) {
      treasureCollection = treasureCollection + 100;
      energy.destroy();
    }
    if (path.y > 400) {
      path.y = height / 2;
    }
    if (coin.y > 400) {
      coin.y = 0;
    }
     if (bomb.y > 400) {
      bomb.y = 0;
    }
     if (power.y > 400) {
      power.y = 0;
    }
     if (energy.y > 400) {
      energy.y = 0;
    }
  }
   if (jake.isTouching(bomb)) {
    gameState = END;
  }
  if (gameState == END) {
    path.velocityY = 0;
    var gameOver = createSprite(120, 200, 20, 20);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.5;
    treasureCollection=0;
  }
  edge = createEdgeSprites();
  jake.x = mouseX;
  jake.collide(lib);
  jake.collide(rib);
  jake.collide(edge[3]);
  
  stroke('white');
  text('Treasure Collection: ' + treasureCollection,50,20);
}