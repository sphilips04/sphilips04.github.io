class InfoBubble {
    constructor(xScale, yScale) {
        //TODO
        //write a function to scale the bubbles to the size of the screen

        this.xScale = xScale;
        this.yScale = yScale;
        this.radius = 150;

    }

    draw() {
        noStroke();
        fill(50, 50, 255);
        ellipse(windowWidth * this.xScale, windowHeight * this.yScale, windowHeight * .12, windowHeight * .12);
    }
}