// Renaming Matter.js modules
const Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint;

// Declaring variables
var ball,
    engine,
    world,
    ground,
    edges = [],
    score = 0,
    gameState = "start",
    lives = 5,
    canvas;

function setup() { // create canvas
    canvas = createCanvas(1100, 700);

    // create engine and set world to default engine world
    engine = Engine.create();
    world = engine.world;

    // create ground
    ground = new Ground(width / 2, height, width + 1, 10);

    // create ball
    ball = new Ball(200, 500, 50);

    // create constraint
    sling = new SlingShot(ball.body, {
        x: 200,
        y: 500
    });

    // creating pins
    pin1 = new Pin(570, 600);
    pin2 = new Pin(640, 600);
    pin3 = new Pin(710, 600);
    pin4 = new Pin(605, 400);
    pin5 = new Pin(675, 400);
    pin6 = new Pin(640, 200);
    pin7 = new Pin(780, 600);
    pin8 = new Pin(745, 400);
    pin9 = new Pin(710, 200);
    pin10 = new Pin(850, 600);
    pin11 = new Pin(815, 400);
    pin12 = new Pin(775, 200);

    // creating edges
    for (var i = 0; i < 3; i++) {
        var x = [0, 550, 1100];
        var y = [350, 0, 350];
        var w = [10, 1100, 10];
        var h = [700, 10, 700]
        edges[i] = new Ground(x[i], y[i], w[i], h[i]);
    }
}

function draw() { // black background
    background(0);

    // update engine
    Engine.update(engine);

    // runs only when gameState is play
    if (gameState === "onSling" || gameState === "launched") { // displaying created bodies
        ball.display();
        ground.display();
        pin1.display();
        pin2.display();
        pin3.display();
        pin4.display();
        pin5.display();
        pin6.display();
        pin7.display();
        pin8.display();
        pin9.display();
        pin10.display();
        pin11.display();
        pin12.display();
        sling.display();

        // calling score function
        pin1.scoring();
        pin2.scoring();
        pin3.scoring();
        pin4.scoring();
        pin5.scoring();
        pin6.scoring();
        pin7.scoring();
        pin8.scoring();
        pin9.scoring();
        pin10.scoring();
        pin11.scoring();
        pin12.scoring();

        // displaying score and lives
        fill(200, 255, 100);
        textSize(20);
        text("SCORE : " + score, 100, 100);
        text("Lives left : " + lives, 1000, 100);

        // checking if score is maximum or lives = 0 to go to end gameState
        if (score >= 2400) {
            gameState = "end";
        }
        if (lives <= 0) {
            gameState = "end"
        }
    }

    // runs only when gameState is start
    if (gameState === "start") { // displaying title and instruction text
        textSize(80);
        var message = "Bowling Alley";
        fill(255);
        textAlign(CENTER);
        text(message, 550, 100);
        textSize(40);
        text("You must drag the bowling ball and hit all to win.", 550, 200);
        text("The pins disappear if they fall down.", 550, 270);
        text("The score increases by 200 for each pin which is hit.", 500, 340);
        text("Try to get the highest score.", 550, 410);
        text("Good Luck !!", 550, 480);
        text("Press S to start and SpaceBar to get another try.", 550, 600);
    }

    // runs only when gameState is end
    if (gameState === "end") {
        if (score === 1200) {
            textAlign(CENTER);
            textSize(80);
            text("You Win !!!", 550, 350);
        } else {
            text("Well tried", 550, 350);
            text("Try Again !", 550, 400);
        }
    }
}

// dragging Ball using mouse
function mouseDragged() {
    if (gameState === "onSling") {
        Matter.Body.setPosition(ball.body, {
            x: mouseX,
            y: mouseY
        });
    }
}

// releasing ball
function mouseReleased() {
    if (gameState === "onSling") {
        sling.fly();
    }
    gameState = "launched";
}

function keyPressed() {
    if (gameState === "launched") { // reset ball position and constraint and decrement lives
        if (keyCode === 32) {
            Matter.Body.setPosition(ball.body, {
                x: 100,
                y: 500
            });
            sling.attach(ball.body);
            lives--;
            gameState = "onSling"
        }
    }
    if (gameState === "start") {
        if (keyCode === 83) { // start game
            gameState = "onSling";
        }
    }
}
