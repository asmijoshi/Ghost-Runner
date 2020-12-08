var gameState='PLAY';

var ghost;
var ghostImage;
var bg, bgImage;
var door, dImage, doorGroup;
var rail, rImage, railGroup;
var inblock, blockGroup;
var gameoverSound, jumpSound;

function preload() {

  ghostImage=loadAnimation("ghost1.png","ghost2.png");
  bgImage = loadImage ("stone wall.jpg");
  dImage = loadImage ("door2.jpg");
  rImage=loadImage("railing-1.jpg");
  
  jumpSound=loadSound("zapsplat_cartoon_pop_medium_48207-1.mp3");
  gameoverSound=loadSound
  ("zapsplat_human_male_voice_says_game_over_001_15726.mp3");
}

function setup(){
createCanvas(600,600);
  
  doorGroup= new Group();
  railGroup= new Group();
  blockGroup= new Group();
  
  bg=createSprite(200,200);
  bg.addImage("background",bgImage);
  bg.scale= 1.5;
  bg.velocityY=4;
  
  ghost=createSprite(200,200,10,10);
  ghost.addAnimation("ghost",ghostImage)
  ghost.scale=0.5;
}

function draw(){

  text(mouseX+","+mouseY,mouseX,mouseY);
  
  console.log(bg.y);
  
  if (gameState=='PLAY'){
  if(bg.y>300){
    bg.y=100;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-4;
    jumpSound.play();
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (keyDown("right")){
    ghost.x=ghost.x+3;
  }
   
  if (keyDown("left")){
    ghost.x=ghost.x-   3;
  }
  
  Door();
  
    if(railGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if(blockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState='END';
      gameoverSound.play();
    }
    
  drawSprites();
}
  if(gameState=='END'){
    fill("black");
    stroke("black")
    textSize(40)
    text("Game Over",200,300);
    
  }
}

function Door(){
  
  if (frameCount%60==0){
  door=createSprite(100,0,40,50);
  door.addImage("door",dImage);
  door.scale=0.3;
  door.velocityY=4;
  door.x=Math.round(random(100,500));
  doorGroup.add(door);
  door.lifetime=600;
    
  rail=createSprite(100,50,40,50);
  rail.addImage("railing",rImage);
  rail.scale=0.5;
  rail.x=door.x;
  rail.velocityY=4;
  railGroup.add(rail);
  rail.lifetime=600;  
    
  inblock=createSprite(100,65,40,2);
  inblock.x=door.x;
  inblock.velocityY=4;
  blockGroup.add(inblock);
  inblock.lifetime=600; 
  inblock.debug=false;
    
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
      
  rail.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  }
}