class LevelCreator {
	
	constructor(skeleton, buttons) {
		
		
		this.map = [34, 33, 364, 334]; //x, y, width, height 
		this.backBtn = [7, 10, 20, 15];
		this.btnGrid = [445, 80, 50]; //xStart, yStart, size
		this.center = createVector(this.map[0] + this.map[2]/2, this.map[1] + this.map[3]/2);
		this.crosshair = createVector(this.map[2]/2, this.map[3]/2);
		this.camera = createVector(0, 0);
		this.skeletonImg = skeleton;
		this.buttonImg = buttons;
		this.buttonNames = ["spawn", "hook", "", "mine", "", "", "", "goal"];
		
		this.title = "";
		this.objects = [];
		this.objectSelected = "none";
	}
	
	drawScreen(assets) {
		screen = "creator";
		background(0);
		image(this.skeletonImg, 0, 0);
		
		
		if (mouseX >= this.backBtn[0] && mouseX <= this.backBtn[0] + this.backBtn[2]){
			if (mouseY >= this.backBtn[1] && mouseY <= this.backBtn[1] + this.backBtn[3]){	
				tint(200);
				if (mouseIsPressed){screen = "main";}
			}
		}
		image(assets, ...this.backBtn, 0, 0, 29, 26);
		noTint();
		
		
		let mp = this.getPosOnMap(mouseX, mouseY);
		let c = this.crosshair;
		fill(0);
		textSize(12);
		text('crosshair pos:[' + c.x + ', ' + c.y + ']', 50, 23);
		text('mouse pos: [' + Math.floor(mp.x) + ', ' + Math.floor(mp.y) + ']', 200, 23)
		return screen;
	}
	
	updateCrosshair() {

		if (keyIsDown(LEFT_ARROW))  {this.crosshair.add(createVector(-2, 0))}
		if (keyIsDown(UP_ARROW))    {this.crosshair.add(createVector(0, -2))}
		if (keyIsDown(RIGHT_ARROW))	{this.crosshair.add(createVector(2, 0))}
		if (keyIsDown(DOWN_ARROW))  {this.crosshair.add(createVector(0, 2))}	
	}
	
	drawButtonGrid() {

		let grid = this.btnGrid;
		let size = grid[2];
		
		textSize(8);
		textAlign(CENTER);
		for (let i = 0; i < 2; i++){
			for (let j = 0; j < 4; j++){
				
				let x = grid[0] + (i * (size + 10));
				let y = grid[1] + (j * (size + 20));
				let name = this.buttonNames[(i * 4) + j];
				
				fill(180);
				rect(x, y, size, size);
				fill(0);
				image(this.buttonImg, x + 5, y + 5, size - 10, size - 10, size * i, size * j, size, size);
				text(name, x, y + size, size);
				
				if (name === this.objectSelected){
					fill(0, 255, 0, 30);
					rect(x, y, size, size);
				}
				
			}
		}

		textAlign(LEFT);
	}
	
	drawMap(spaceImg) {
		image(spaceImg, ...this.map, this.crosshair.x - this.map[2]/2, this.crosshair.y - this.map[3]/2, this.map[2], this.map[3]);
		fill(255, 0, 0);
		ellipse(this.center.x, this.center.y, 5, 5);
	}
	
	drawObjectsOnMap() {
		
		for (let object of this.objects){
			if (this.checkWithinMap(object[1])){
				
				let name = object[0];
				let posOnMap = createVector(object[1].x, object[1].y);
				let posOnScreen = posOnMap.add(createVector(this.map[0] - 20, this.map[1] - 20));
				let pos = posOnScreen;
				
				if (name === "spawn"){
					
					image(this.buttonImg, pos.x, pos.y, 40, 40, 0, 0, 50, 50);
					
				} else if (name === "hook"){
					
					image(this.buttonImg, pos.x, pos.y, 40, 40, 0, 50, 50, 50);
					
				} else if (name === "mine"){
					
					image(this.buttonImg, pos.x, pos.y, 40, 40, 0, 150, 50, 50);
					
				} else if (name === "goal"){
					
					fill(0, 255, 0);
					rect(pos.x, pos.y, 80, 240);					
				}
			}
		}
	}
	
	updateButtonGrid() {
		
		let grid = this.btnGrid;
		let size = grid[2];
		
		for (let col = 0; col < 2; col++){
			for (let row = 0; row < 4; row++){
				
				let x = grid[0] + (size + 10)*col;
				let y = grid[1] + (size + 20)*row;
				
				if (mouseX >= x && mouseX <= x + size){
					if (mouseY >= y && mouseY <= y + size){
					
						fill(255, 30);
						rect(x, y, size, size);
						
						if (mouseIsPressed){
							this.objectSelected = this.buttonNames[(col * 4) + row]
						}
					
					}
				}
			}
			
		}
		
		
	}
	
	checkWithinMap(pos) {
		
		
		
		return true;
	}
	
	getPosOnMap(x, y) {
		
		let a = (x - this.map[0]) + (this.crosshair.x - this.map[2]/2);
		let b = (y - this.map[1]) + (this.crosshair.y - this.map[3]/2);
		
		return createVector(a, b);
	}
	
	addObject(){
		let mX = mouseX;
		let mY = mouseY;
		
		if (mX >= this.map[0] && mX <= this.map[0] + this.map[2]){
			if (mY >= this.map[1] && mY <= this.map[1] + this.map[3]){

				let posOnMap = this.getPosOnMap(mX, mY);
				this.objects.push([this.objectSelected, posOnMap]);

			}
		}
	}
	
}
