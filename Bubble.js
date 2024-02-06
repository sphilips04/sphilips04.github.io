class Bubble {
    constructor(x, y) {
        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
        this.width = 50;
        this.height = 50;
        this.framesAlive = 0;
        this.direction = createVector(0, 0);
    }

    draw() {
        fill(100, 100, 255);
        ellipse(this.x, this.y, this.height, this.width);

        this.update();
    }

    update() {
        if (this.framesAlive % 30 == 0) {this.changeDirection();}

        this.x += this.direction.x;
        this.y += this.direction.y;
        this.smoothMovement();

        this.framesAlive += 1;
    }

    changeDirection() {
        console.log(this.direction.x);
        this.direction.x = (random() * 1.5) * random([1, -1]);
        this.direction.y = (random() * 1.5) * random([1, -1]);
    }

    smoothMovement() {
        this.direction.x -= random()/10;
        this.direction.y -= random()/10;
    }
}