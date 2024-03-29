class NameBubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = 0;
        this.timeSeconds = 0;
        this.animationTime = 0;
        this.frames = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]];
        this.yFrame = 0;
        this.radius = 40;
        this.color = random([[216, 17, 89], [0, 150, 0], [20, 80, 220]])
    }

    draw(bubbleAnimation) {

        fill(...this.color, 150);
        ellipse(this.x, this.y, this.radius-10, this.radius-10);
        imageMode(CENTER);
        let currentFrame = this.frames[this.timeSeconds];
        image(bubbleAnimation, this.x, this.y, this.radius, this.radius,
                             32 * currentFrame[0], 32 * currentFrame[1], 32, 32);


        this.update();
    }

    update() {
        this.time++;
        this.animationTime += 1;
        if (this.time == 30) {
            this.time = 0;
            
        }

        if (this.timeSeconds == 6) {this.timeSeconds = 0;}

        this.y += sin(this.animationTime / 20) / 4;


        if (this.animationTime <= 600/3) {
            this.y += 3
        }
    }
}