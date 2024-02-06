let canvas;
let bubbles;

function setup() {
    bubbles = new Array();
    for (let i = 0; i < 50; i++) {
        let bubble = new Bubble();
        bubbles.push(bubble);
    }
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    bubbles.forEach((bubble) => bubble.draw());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
