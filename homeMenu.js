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
    [
        [433, 301], [406, 283], [371, 287], [348, 318], [342, 361],
        [354, 399], [388, 426], [413, 448], [435, 474], [427, 507],
        [400, 526], [362, 526], [329, 506], [476, 409], [475, 446],
        [477, 486], [477, 525], [478, 562], [480, 595], [510, 406],
        [547, 419], [553, 455], [526, 486], [596, 412], [595, 450],
        [598, 489], [597, 526], [631, 529], [672, 532], [631, 410],
        [674, 409], [633, 470], [719, 515], [718, 485], [718, 454],
        [733, 425], [762, 416], [794, 426], [810, 457], [815, 489],
        [816, 515], [923, 438], [896, 422], [862, 428], [851, 463],
        [858, 500], [882, 525], [926, 517], [972, 405], [972, 441],
        [974, 475], [974, 514], [1008, 518], [1042, 521], [1013, 399],
        [1047, 398], [1006, 457], [1096, 405], [1094, 442], [1096, 473],
        [1094, 510], [1094, 544], [1124, 429], [1151, 414], [1182, 413], [1210, 431]
    ].forEach((posArr) => nameBubbles.push(new NameBubble(posArr[0], posArr[1] - 50)))

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
}

function draw() {
    background(255);

    bubbles.forEach((bubble) => bubble.draw());
    fill(255,0,0)
    nameBubbles.forEach((bubble) => bubble.draw(bubblesAnimation));


    fill(255,0,0)
    //infoBubbles.forEach((array) => array.forEach((infoBubble) => infoBubble.draw()));


    //stroke(100);
    //for (let i = 0; i < 4; i++)
    //    line(windowWidth * (i * .25), 0, windowWidth * (i * .25), windowHeight);
    //line(0, windowHeight/2, windowWidth, windowHeight/2);
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
    
}

function logName() {
    let consoleLog = "";
    nameBubbles.forEach((bubble) => consoleLog += ("[" + bubble[0] + ", " + bubble[1] + "], "));
    console.log(consoleLog);
}