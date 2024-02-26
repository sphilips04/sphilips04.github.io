let canvas;
let bubbles;
let infoBubbles;
let nameBubbles;
let bubblesAnimation;

function preload() {
    bubblesAnimation = loadImage("homeAssets/bubblePop1.png");
}

function setup() {
    bubbles = new Array();
    for (let i = 0; i < 100; i++) {
        let bubble = new Bubble();
        bubbles.push(bubble);
    }

    infoBubbles = new Array();
    for (let i = 1; i <= 1; i++) {
        infoBubbles.push(new Array())
        for (let j = 1; j <= 3; j++) {
            infoBubbles[i-1].push(new InfoBubble(160 * j + 200, 200 + i * 200));
        }
    }

    nameBubbles = new Array();

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
}

function draw() {
    background(255);

    bubbles.forEach((bubble) => bubble.draw());
    fill(255,0,0)
    nameBubbles.forEach((bubble) => ellipse(bubble[0], bubble[1], 32, 32));


    fill(255,0,0)
    ellipse(mouseX, mouseY, 32, 32);
    //infoBubbles.forEach((array) => array.forEach((infoBubble) => infoBubble.draw()));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bubbles.forEach((bubble) => bubble.scaleBubblePos())
    infoBubbles.forEach((array) => array.forEach((infoBubble) => infoBubble.scaleRadius()));
}


function mouseWheel(event) {
    let scrollDistance = -event.delta;
    let maxSpeed = 3;
    if (scrollDistance < 0) {scrollDistance = constrain(scrollDistance, -maxSpeed, 0);}
    if (scrollDistance > 0) {scrollDistance = constrain(scrollDistance, 0, maxSpeed);}
    bubbles.forEach((bubble => bubble.move(0, scrollDistance)))
}

function mouseClicked() {
    nameBubbles.push([mouseX, mouseY]);
}

function logName() {
    let consoleLog = "";
    nameBubbles.forEach((bubble) => consoleLog += ("[" + bubble[0] + ", " + bubble[1] + "], "));
    console.log(consoleLog);
}