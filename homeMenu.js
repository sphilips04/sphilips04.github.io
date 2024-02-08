let canvas;
let bubbles;
let infoBubbles;

function setup() {
    bubbles = new Array();
    for (let i = 0; i < 50; i++) {
        let bubble = new Bubble();
        bubbles.push(bubble);
    }

    infoBubbles = new Array();
    for (let i = 1; i <= 2; i++) {
        infoBubbles.push(new Array())
        for (let j = 1; j <= 6; j++) {
            infoBubbles[i-1].push(new InfoBubble(j/10 * 1.45, i/10 * 3.2));
        }
    }

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
}

function draw() {
    background(255);

    bubbles.forEach((bubble) => bubble.draw());
    infoBubbles.forEach((array) => array.forEach((infoBubble) => infoBubble.draw()));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bubbles.forEach((bubble) => bubble.scaleBubble())
}

function createBubbleArr() {
    
}
