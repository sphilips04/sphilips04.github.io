let canvas; //only being used to center the canvas on the page
let game; //being used to hold the GameSpace class and its values
let levelCreator;

const CANV_HEIGHT = 400;
const CANV_WIDTH = 600;

let level;
let character;
let paused = false;

let currentHook;
let currentScreen = "main";
let levelNum = 1;
let levelSelectPageNum = 1;

//put image vars here
let titleScreenImage;
let levelSelectImage;
let levelCreatorImage;
let creatorAssets;
let levelSelectAssets;
let pauseMenuImage;
let asteriodAssets;
let bigSpaceImg;

//loads before setup		
function preload() {
	titleScreenImage  = loadImage("imgs/titleScreen.png");
	levelSelectImage  = loadImage("imgs/levelSelectSkeleton.png");
	levelCreatorImage = loadImage("imgs/creatorSkeleton.png");
	creatorButtons    = loadImage("imgs/creatorButtons.png");
	levelSelectAssets = loadImage("imgs/levelSelectAssets.png");
	pauseMenuImage    = loadImage("imgs/pauseMenu.png");
	asteriodAssets    = loadImage("imgs/asteriodAssets.png");
	bigSpaceImg       = loadImage("imgs/space2.png");
	mineImg	          = loadImage("imgs/mine.png");

	levelCreator = new LevelCreator(levelCreatorImage, creatorButtons);
	level = new Levels(); 	//loadLevel is in preload because loadStrings needs
	level.loadLevel(levelNum);  //to complete before the game is loaded
}

//loads before draw loop starts
function setup() {
	frameRate(60);
	
	canvas = createCanvas(CANV_WIDTH, CANV_HEIGHT);
	canvas.position(windowWidth/2 - CANV_WIDTH/2, windowHeight/2 - CANV_HEIGHT/2);
	
	level.createLevel();
	level.loadLevel(levelNum + 1);
	character = new Character(CANV_WIDTH/2, CANV_HEIGHT/2); //character is in the middle of the canvas
	game = new GameSpace();
	
	//in the game loop, closestHook() is only run when the mouse is not being pressed
	//but when you press play in the mainMenu, your mouse is still being pressed down
	//therefore, for the first couple frames currentHook is undefined which crashes the game
	//the line below is a quick fix and is probably a bad fix for a couple reasons
	currentHook = level.hooks[0]; 
}

//is called frameRate times a second
function draw() {
	if (currentScreen === "main"){drawMainScreen();}
	else if (currentScreen === "game") {
		drawGame();
		if (paused){drawPauseMenu();}
	}
	else if (currentScreen === "levels") {drawLevelSelection();}
	else if (currentScreen === "creator") {drawCreatorScreen();}
}

//p5 preset callback function, everytime window is resized it is called
function windowResized() {
  canvas.position(windowWidth/2 - CANV_WIDTH/2, windowHeight/2 - CANV_HEIGHT/2);
}

//returns the closest hook from the character
function closestHook() {
	hooks = level.hooks
	
	//returns 0 when there is no closestHook
	let returnVal = 0;
	
	//starting distance
	let distance = 1000;
	for (let hook of hooks){
		
		//backward buffer allows us to set an offset in what we want the closest hook to be
		//if the buffer were 0, then the closest hook would never be the hook to the left
		//of the character, so you could never go backward
		let backwardBuffer = 10000;
		
		//if the character is beyond the buffer, it will disregard the hook
		if (character.pos.x - hook.x >= backwardBuffer){
			continue;
		}
		
		//calc distance using a preset p5 function
		let currentDistance = character.pos.dist(hook.pos);
		
		if (currentDistance < distance){
			returnVal = hook;
			distance = currentDistance;
		}
	}
	
	return returnVal;
}

//when you reach the goal this function is called
//increments the currentLevel by one and runs setup again
function levelCompleted() {
	levelNum++;
	setup(); //running setup again is a little confusing
	//we should just manually reset all the values because there
	//is a lot of redundancy
}

//when currentScreen is "game" this is run in draw()
function drawGame() {
	background(0);
	
	if (!keyIsDown(32)) {currentHook = closestHook(level.hooks);}
	
	if(!paused){
		
		game.applyGravity(); //add the gravity to game.vel
		game.applyHookForce(currentHook, character.pos); //add gravitational force to game.vel
		game.constrain();
		level.hooks = game.updateHooks(level.hooks, game.vel);
		level.mines = game.updateMines(level.mines, game.vel);
		
		let win = game.checkGoal(character, level.goalLine, level.goalLineWidth, level.goalLineHeight);
		if (win) {levelCompleted();}
		
		let bgVel = createVector(game.vel.x / 10, game.vel.y / 10);
		game.cameraPos.add(bgVel);
		
		level.goalLine.sub(game.vel);
		
	}
	
	image(bigSpaceImg, 0, 0, 600, 400, game.cameraPos.x, game.cameraPos.y, 600, 400);
	
	strokeWeight(1); //this code is for the green and blue lines that show the closest hook
	if (keyIsDown(32)){stroke(0, 255, 0);}
	else {stroke(100, 100, 255);}
	
	line(currentHook.pos.x, currentHook.pos.y, 300, 200);
	noStroke();

	game.drawHooks(level.hooks, asteriodAssets, level.asteriodSeed);
	game.drawMines(level.mines, mineImg);

	character.draw(character.pos.x, character.pos.y);
	
	game.drawGoal(level.goalLine, level.goalLineWidth, level.goalLineHeight);
}

function drawPauseMenu() {
	
	fill(0);
	
	let width = 150;
	let height = 200;
	let x = 30;
	let y = 30;
	
	image(pauseMenuImage, x, y)
	
	stroke(20);
	strokeWeight(10);
	line(x, y, x + width, y);
	line(x, y + height, x + width, y + height);
	line(x, y, x, y + height);
	line(x + width, y, x + width, y + height);
	noStroke();
	
	let buttonWidth = 130;
	let buttonHeight = 40;
	let buttonsX = x + 10;
	let resumeButtonY = y + 23;
	let menuButtonY = resumeButtonY + buttonHeight + 8;
	
	fill(255, 30);
	if (mouseX >= buttonsX && mouseX <= buttonsX + buttonWidth){
	
		if (mouseY >= resumeButtonY && mouseY <= resumeButtonY + buttonHeight){
			rect(buttonsX, resumeButtonY, buttonWidth, buttonHeight);
			if (mouseIsPressed){paused = !paused};
		}
		
		if (mouseY >= menuButtonY && mouseY <= menuButtonY + buttonHeight){
			rect(buttonsX, menuButtonY, buttonWidth, buttonHeight);
			if (mouseIsPressed){currentScreen = "main";}
		}
	}
}
//when currentScreen is "main" this is run in draw()
function drawMainScreen() {
	//draw the background with rgb(0, 0, 0) and alpha of 10
	//alpha of 10 is what is doing the fade effect on the spiral
	background(0);
	if (frameCount % 2 == 0){game.mainMenuCounter++;}
	if (game.mainMenuCounter >= bigSpaceImg.width/2){game.mainMenuCounter = 0;}
	let a = game.mainMenuCounter;
	image(bigSpaceImg, 0, 0, CANV_WIDTH, CANV_HEIGHT, a, a,
	CANV_WIDTH, CANV_HEIGHT);
	
	//by default shapes are 
	noStroke();
	for (let j = 0; j <= 90; j++){
		
		let i = j + frameCount;
		
		let pos = createVector(cos(i * 4 + i) * (250 - j), sin(i * 4 + i) * (250 - j));
		pos.x += CANV_WIDTH/2;
		pos.y += CANV_HEIGHT/2;
		
		//fill(random(200, 255), 0, random(200, 255));
		fill(255, j + 100);
		ellipse(pos.x, pos.y, 40, 40);
	}

	//everything here is kinda self explanitory
	let menuWidth = 300;
	let menuHeight = 310;
	let menuPos = createVector(CANV_WIDTH/2 - menuWidth/2, CANV_HEIGHT/2 - menuHeight/2); //center the menu image
	image(titleScreenImage, menuPos.x, menuPos.y); //draw the menu on the screen
	
	//fill the highlight rectangles with white and be transparent
	fill(255, 30); //this code is detect when your over the buttons
	if (mouseX >= 169 && mouseX <= 429){
		for (let i = 0; i < 3; i++){
			
			let gapBetweenButtons = 13;
			let buttonHeight = 62;
			let offset = (buttonHeight + gapBetweenButtons) * i;
			let buttonStart = menuPos.y + 78;

			if (mouseY >= buttonStart + offset && mouseY <= buttonStart + offset + buttonHeight){
				rect(menuPos.x + 19, buttonStart + offset, 260, 63);
				
				if (mouseIsPressed){
					if (i === 0){currentScreen = "game";}
					if (i === 1){currentScreen = "levels"}
					
				}
			}
		}
	}
	
	//creating a border around the image
	strokeWeight(10);
	stroke(20);
	line(menuPos.x, menuPos.y, menuPos.x + menuWidth, menuPos.y);
	line(menuPos.x, menuPos.y + menuHeight, menuPos.x + menuWidth, menuPos.y + menuHeight);
	line(menuPos.x, menuPos.y, menuPos.x, menuPos.y + menuHeight);
	line(menuPos.x + menuWidth, menuPos.y, menuPos.x + menuWidth, menuPos.y + menuHeight);
	noStroke();
}

function drawLevelSelection() {	

	image(levelSelectImage, 0, 0);
	
	let buttonsY = 65;
	let arrowX = 45;
	let creatorButtonX = 526; 
	let buttonHeight = 26;
	let buttonWidth = 29;

	
	if (mouseY >= buttonsY && mouseY <= buttonsY + buttonHeight){
		if (mouseX >= arrowX && mouseX <= arrowX +  buttonWidth){
			tint(200);
			
			if (mouseIsPressed){
				currentScreen = "main";
			}
		}

	}
	//29 x 26
	image(levelSelectAssets, arrowX, buttonsY, 29, 26, 0, 0, 29, 26);
	noTint();
	
	if (mouseY >= buttonsY && mouseY <= buttonsY + buttonHeight){
		if (mouseX >= creatorButtonX && mouseX <= creatorButtonX +  buttonWidth){
			tint(200);
			
			if (mouseIsPressed){
				currentScreen = "creator";
			}
			
		}
	}
	
	image(levelSelectAssets, creatorButtonX, buttonsY, 29, 26, 29, 0, 29, 26);
	noTint();
}

function drawCreatorScreen() {
	levelCreator.drawMap(bigSpaceImg);
	
	fill(255, 0, 0);
	rect(100, 100, 100, 100);	
	
	levelCreator.drawObjectsOnMap();
	currentScreen = levelCreator.drawScreen(levelSelectAssets, bigSpaceImg);
	levelCreator.updateCrosshair();
	levelCreator.drawButtonGrid();
	levelCreator.updateButtonGrid();
}

function keyPressed() {
	if (currentScreen === "game" && keyCode === ESCAPE){
		paused = !paused;
	}
}

function mouseClicked() {
	if (currentScreen === "creator"){
		levelCreator.addObject();
	}
}