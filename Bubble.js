class Bubble {
    constructor(x, y) {

        //let bubbleXBuffer = .1 * windowWidth;
        //let bubbleYBuffer = .1 * windowHeight;

        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
        this.width = 50;
        this.height = 50;
    }

    draw() {
        fill(100, 100, 255);
        ellipse(this.x, this.y, this.height, this.width);
    }
}