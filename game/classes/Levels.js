class Levels {
	
	constructor() {
		
		this.currentLevel;
		this.levelName;
		this.hooks;
		this.mines;
		this.goalLine;
		this.goalLineWidth = 80;
		this.goalLineHeight = 240;
		this.startingPos;
		this.asteriodSeed;
	}
	
	//loadLevel() and createLevel() are staggered in game.js
	//as soon as you load into the next level, loadLevel() is run again
	//and it loads the nextLevel giving it enough time to complete loadStrings()
	//when you complete the level, createLevel() is run
	loadLevel(intLevel) {
		this.currentLevel = loadStrings("levels/level" + intLevel + ".txt");
	}
	
	createLevel() {
		this.hooks = [];
		this.mines = [];
		this.asteriodSeed = [];
		this.levelName = this.currentLevel[0];
			//i = 1, to skip the level name at the top of the file
		for (let i = 1; i < this.currentLevel.length; i++){
			
			let line = this.currentLevel[i].split("#");

			if (line[0] === "hook"){
				let m = parseInt(line[3].split(":")[1]);
				
				this.hooks.push({pos:getPosFromLine(line), mass:m});
				this.asteriodSeed.push(random([0, 1, 2, 3, 4, 5]));
			}

			if (line[0] === "mine"){
				this.mines.push({pos:getPosFromLine(line)});
			}
			
			if (line[0] === "startingPos"){
				this.startingPos = getPosFromLine(line);
			}

			if (line[0] === "goalLine"){
				this.goalLine = getPosFromLine(line);
			}
		}
	}
	
	//this is not being used yet
	objectsToDraw(){
		
		let objects = [
				//DO NOT PUT A SEMICOLON AFTER THIS LINE IT CRASHES???
			...this.hooks //... is the spread operator
		];
		return objects;	
	}

}

function getPosFromLine(line){
	let x = parseInt(line[1].split(":")[1]);
	let y = parseInt(line[2].split(":")[1]);

	return createVector(x, y);
}