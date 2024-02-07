class Bubble {
    constructor() {
        this.x;
        this.y;
        this.scaleBubble();
        this.radius = random(25, 75);
        this.framesAlive = 0;
        this.movementOffset = random(0, 360);
    }

    scaleBubble() {
        this.x = random(0, windowWidth);
        this.y = random(-windowHeight - 200, -50);
    }

    draw() {
        noStroke();
        fill(200, 200, 255, 100);
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