class Bubble {
    constructor(x, y) {
        this.x = random(0, windowWidth);
        this.y = random(-windowHeight - 200, -50);
        this.radius = random(25, 75);
        this.framesAlive = 0;
        this.movementOffset = random(0, 360);
    }

    draw() {
        fill(100, 100, 255);
        ellipse(this.x, this.y, this.radius, this.radius);

        this.update();
    }

    update() {
        this.y += 1;
        this.x += cos(this.framesAlive/100 + this.movementOffset);
        this.radius += cos((this.framesAlive + this.movementOffset)/30) * 0.25;
        
        if (this.y - this.radius*2 > windowHeight) {this.y = 0 - this.radius*2};
        this.framesAlive += 1;
    }
}
