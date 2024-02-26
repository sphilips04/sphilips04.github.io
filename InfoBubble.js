class InfoBubble {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.drawX = this.x;
        this.drawY = this.y;
        this.radius = windowWidth * .04;
        this.accel;
        this.vel = createVector(random([1, -1]), random([1, -1]));

        this.isShaking = false;
        this.timeShaking = 0;

    }

    scaleRadius() {
        this.radius = windowWidth * .04;
    }

    draw() {
        noStroke();
        fill(50, 50, 255);
        ellipse(this.drawX, this.drawY, this.radius*2, this.radius*2);

        this.update();
    }

    update() {
        if (this.checkWallCollision()) {
            this.isShaking = true;
            this.timeShaking = 0;
        }

        if (this.isShaking) {
            let secondsShaking = this.timeShaking / 30;

            if (this.timeShaking % 2 == 0) {
                this.drawX += (cos(this.timeShaking) * (7 - secondsShaking))/5;
            } else {
                this.drawY += (cos(this.timeShaking) * (7 - secondsShaking))/5;
            }

            
            if (secondsShaking == 3) {
                this.drawX = this.x;
                this.drawY = this.y;
                this.timeShaking = 0;
                this.isShaking = false;
            }
            this.timeShaking++;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.drawX += this.vel.x;
        this.drawY += this.vel.y;
    }

    checkWallCollision() {
        let collided = false;
        if (this.x - this.radius < 0) {
            collided = true;
            this.vel.x *= -1;
        } else if (this.x + this.radius > windowWidth) {
            collided = true;
            this.vel.x *= -1;
        } else if (this.y - this.radius < 0) {
            collided = true;
            this.vel.y *= -1;
        } else if (this.y + this.radius > windowHeight) {
            collided = true;
            this.vel.y *= -1;
        }

        return collided;
    }
}