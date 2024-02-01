class Character {
	
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.width = 20;
		this.height = 20;
	}
	
	draw(x, y)	{
		fill(255);
		ellipse(x, y, 20, 20);
	}
	
	//this is never used in code
	setPos(x, y) {
		this.pos.set(x, y);
	}
	
}