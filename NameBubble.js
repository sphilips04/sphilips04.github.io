class NameBubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = 0;
        this.timeSeconds = 0;
        this.frames = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]];
        this.yFrame = 0;
        this.radius = 32;
    }

    draw(bubbleAnimation) {

        fill(0, 0, 255, 50);
        ellipse(this.x, this.y, this.radius-10, this.radius-10);
        imageMode(CENTER);
        let currentFrame = this.frames[this.timeSeconds];
        image(bubbleAnimation, this.x, this.y, this.radius, this.radius,
                             32 * currentFrame[0], 32 * currentFrame[1], 32, 32);


        this.update();
    }

    update() {
        this.time++;
        if (this.time == 30) {
            this.time = 0;
            this.timeSeconds++;
        }

        if (this.timeSeconds == 6) {this.timeSeconds = 0;}
    }
}