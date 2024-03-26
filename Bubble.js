class Bubble {
    constructor() {
        this.x;
        this.y;
        this.scaleBubblePos();
        this.radius = random(25, 100);
        this.framesAlive = 0;
        this.movementOffset = random(0, 360);
    }

    scaleBubblePos() {
        this.x = random(0, windowWidth);
        this.y = random(-windowHeight*2, -50);
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
        
        if (this.y > windowHeight + 800) {this.y = 0 - this.radius*2};
        this.framesAlive += 1;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }
}   