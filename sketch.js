var ground
var gameStates;
var cursor1, cursorImg;
var entry, entryImg, selection, selectionImg, main, mainImg;
var next, nextImg, helicopter, helicopterImg, helicopter2Img, drone, droneImg, drone2, drone2Img, back, back2, backImg, playAgain, playAgainImg;
var posX, posY;
var package, packageImg, packageBody;
var block1, block2, block3, blockBody1, blockBody2, blockBody3, blockImg;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("package.png");
	packageImg=loadImage("package.png");
	entryImg = loadImage("entry.png");
	selectionImg = loadImage("selection.png");
	mainImg = loadImage("main.png");
	cursorImg = loadImage("cursorImg.png");
    nextImg = loadImage("next.gif");
	backImg = loadImage("back.gif");
	droneImg = loadImage("drone.gif");
	helicopterImg = loadImage("helicopter.gif");
	helicopter2Img = loadImage("helicopter2.gif");
}

function setup() {
	createCanvas(800,800);

	gameStates = "entry";

	engine = Engine.create();
	world = engine.world;

	ground = Bodies.rectangle(400, 790, 800, 20 , {isStatic:true} );
	World.add(world, ground); 
	 
	groundSprite=createSprite(ground.position.x, ground.position.y,800,20);
	groundSprite.shapeColor=color(255)
	groundSprite.visible=false;
	

	imageMode(CENTER);
	entry = createSprite(width/2, height/2,400,400);
	entry.addImage("Entry Img", entryImg);
	entry.visible=false;
	selection = createSprite(400,400,800,800);
	selection.addImage("Selection Image", selectionImg);
	selection.visible=false;
	main = createSprite(400,500,800,800);
	main.addImage("main Image", mainImg);
    main.visible=false;
	next = createSprite(380,500,100,40);
	next.addImage("nextImage", nextImg);
	next.scale=0.4;
	next.visible= false;
	back = createSprite(100,780, 10,10);
	back.visible= false;
	back2 = createSprite(100,780, 10,10);
	back.visible= false;
	drone = createSprite(200,300, 10,10);
	drone.addImage(droneImg);
	drone.scale=0.4;
	drone.visible=false;
	drone2 = createSprite(400,100,60,60);
	drone2.addImage("droneImg", droneImg);
	drone2.addImage("helicopter2Img", helicopter2Img);
	drone2.scale=0.6;
	drone2.visible=false;
	helicopter = createSprite(600,300,10,10);
	helicopter.addImage("helicopterImg", helicopterImg);
	helicopter.scale=0.4;
	helicopter.visible=false;

	var properties={
		isStatic: true,
		restitution: 0.8
	}
    packageBody = Bodies.rectangle(drone2.x, drone2.y+120,40,40, properties);
	World.add(world, packageBody);
	package = createSprite(packageBody.position.x, packageBody.position.y, 40,40);
	package.addImage("packageImg",packageImg);
	package.scale=0.4;
	package.visible=false;

	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);
  if(gameStates==="entry") {
	entry.visible=true;
	next.visible=true;
	if(gameStates==="entry" && mousePressedOver(next)){
	  entry.visible=false;
	  next.visible=false;
	  gameStates="selection";
	}
  }
  if(gameStates=== "selection") {
	  selection.visible=true;
	  drone.visible=true;
	  helicopter.visible=true;
	
	if(mousePressedOver(drone)) {
	  selection.visible=false;
	  drone.visible=false;
	  helicopter.visible=false;
	  gameStates="drone";
	}
	if(mousePressedOver(helicopter)) {
	  selection.visible=false;
	  drone.visible=false;
	  helicopter.visible=false;
	  gameStates="helicopter";
	}
  }
  if(gameStates==="drone") {
	main.visible=true;
	drone2.visible=true;
	main.depth=1;
	drone2.depth=2;
	
	package.x=packageBody.position.x;
	package.y=packageBody.position.y;
	package.visible=true;
	blockBody1.display();
	blockBody2.display();
	blockBody3.display();
	if(keyDown(LEFT_ARROW)) {
	   drone2.x = drone2.x-5;
	   packageBody.position.x= packageBody.position.x-5;
	}
	if(keyDown(RIGHT_ARROW)) {
	   drone2.x = drone2.x+5;
	   packageBody.position.x= packageBody.position.x+5;
	}
  }
	if(keyDown(DOWN_ARROW)) {
		package.x=packageBody.position.x;
		package.y=packageBody.position.y;
		Matter.Body.setStatic(packageBody, false);
	 }
	 if(gameStates==="helicopter") {
		main.visible=true;
		drone2.changeImage("helicopter2Img", helicopter2Img);
		drone2.visible=true;
		main.depth=1;
		drone2.depth=2;
		package.visible=true;
		package.x=packageBody.position.x;
	        package.y=packageBody.position.y;
		if(keyDown(LEFT_ARROW)) {
			packageBody.position.x= packageBody.position.x-5;
			drone2.x = drone2.x-5;
		 }
		 if(keyDown(RIGHT_ARROW)) {
			packageBody.position.x= packageBody.position.x+5;
			drone2.x = drone2.x+5;
		 }
		 if(keyDown(DOWN_ARROW)) {
			 package.x=packageBody.position.x;
			 package.y=packageBody.position.y;
			 Matter.Body.setStatic(packageBody, false);
		  }
	 }
	Engine.update(engine);
	blockBody1 = new Block(250,670);
	//block1 = createSprite(blockBody1.position.x, blockBody1.position.y, 20,20);
	blockBody2 = new Block1(400, 720);
	//blockBody2 = Bodies.rectangle(400,700,100,20, {isStatic: true});
	//World.add(world, blockBody2);
	//block2 = createSprite(blockBody2.position.x, blockBody2.position.y, 100,20);
	blockBody3 = new Block(550, 670);
	//block3 = createSprite(blockBody3.position.x, blockBody3.position.y, 20, 100);
	drawSprites();
	blockBody1.display();
	blockBody2.display();
	blockBody3.display();
}
