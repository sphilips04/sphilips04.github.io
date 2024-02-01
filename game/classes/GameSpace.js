class GameSpace {
	
	constructor() {
		this.mainMenuCounter = 0;
		this.cameraPos = createVector(1200, 800);
		this.vel = createVector(0, 0);
		this.mass = 15;
		this.accel = createVector(0, 0);
		this.force;
		
	}
	
	applyGravity() {
		this.accel.set(0, .2);
		this.vel.add(this.accel);
	}
	
	applyHookForce(hook, charPos) {		
		if (keyIsDown(32)) {
			this.accel.set(0, 0);
			
			let GRAV = 15;
			
			this.force = p5.Vector.sub(hook.pos, charPos);
			
			let distanceSq = constrain(this.force.magSq(), 400, 1500);
			let strength = GRAV * (this.mass * hook.mass) / distanceSq;
			this.force.setMag(strength);
			this.force.div(this.mass);
			
			this.accel.add(this.force);
			this.vel.add(this.accel);
			
		}
	}
	
	//we should make a function called constrain and use update() for something more general
	constrain() {
		//constrain the vel
		this.vel.x = constrain(this.vel.x, -10, 10);
		this.vel.y = constrain(this.vel.y, -5, 5);
		
	}
	
	checkGoal(character, goalPos, goalWidth, goalHeight) {
		//fill(255);
		//rect(goalPos.x, goalPos.y, goalWidth, goalHeight);
		if (goalPos.x <= character.pos.x && goalPos.x + goalWidth >= character.pos.x){
			if (character.pos.y >= goalPos.y && character.pos.y <= goalPos.y + goalHeight) {
				return true;
			}
		}
		return false;
	}
	
	updateHooks(hooks, vel) {
		for (let hook of hooks){
			hook.pos.sub(vel);
		}
		return hooks;
	}

	updateMines(mines, vel){
		for (let mine of mines){
			mine.pos.sub(vel);
		}
		return mines;
	}
	
	drawHooks(hooks, img, randomSeed) {
		let num = 0;
		for (let hook of hooks){

			for (let i = 9; i >= 5; i--){
				fill(255, 100, 255, 255 - (25 * i));
				ellipse(hook.pos.x, hook.pos.y, 6 * i, 6 * i);
				
			}
			
			image(img, hook.pos.x - 20, hook.pos.y - 20, 40, 40, 40 * randomSeed[num], 0, 40, 40);
			num++;
		}
	}
	
	drawMines(mines, img) {
		for (let mine of mines){

			for (let i = 9; i >= 5; i--){
				fill(200, 0, 0, 255 - (30 * i));
				ellipse(mine.pos.x, mine.pos.y, 6 * i, 6 * i);
			}

			image(img, mine.pos.x - 20, mine.pos.y - 20);
		}
	}

	drawGoal(pos, width, height) {
		//fill(255);
		//rect(pos.x, pos.y, width, height);
		for (let i = 10; i > 0; i -= 3){
			
			stroke(100, 255, 100, 255 - (25 * i));
			strokeWeight(i);
			line(pos.x, pos.y, pos.x + width, pos.y);
			line(pos.x, pos.y + height, pos.x + width, pos.y + height);
			line(pos.x, pos.y, pos.x, pos.y + height);
			line(pos.x + width, pos.y, pos.x + width, pos.y + height);
			
			for (let j = 0; j < 8; j++){
				
				line(pos.x, pos.y + (j * 30), pos.x + width, pos.y + ((j + 1) * 30));
				
			}
			noStroke();
		}
	}	
}