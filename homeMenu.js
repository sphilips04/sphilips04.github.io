let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(50);

    fill(255,0,0)
    ellipse(200, 200, .01 * windowWidth, .01 * windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
