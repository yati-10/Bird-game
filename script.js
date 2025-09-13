//Press the space bar or mouse to start

/* VARIABLES */
let bird, ground, pipes, gameOver, canStartNewGame;
let birdImg;

/* PRELOAD LOADS FILES */
function preload() {
	birdImg = loadImage("bird.png");
}

/* SETUP RUNS ONCE */
function setup() {
	createCanvas(400, 600);
  world.autoStep = false;

  //Create ground sprite
	ground = new Sprite(150, 580, 800, 40, "n");

  //Create player or bird sprite
	bird = new Sprite(0, height / 2);
	bird.img = birdImg; 
	bird.scale = 0.3;

  //Create game pipes group
	pipes = new Group();
  pipes.h = 350;
  pipes.w = 70;
  pipes.color = "blue";
	pipes.collider = "s";

  //Set the camera location
  camera.x = 150;
  gameOver = true;
  canStartNewGame = true;
}

/* DRAW LOOP REPEATS */
function draw() {
	
  //Starts the game with a mouse pressed or space bar
  if (mouse.presses() || kb.presses("space")) {
    bird.vel.y = -9;
    
    if (canStartNewGame) {
      newGame();
    }
	}

  //If the game isn't over run the code
	if (!gameOver) {
		//Rotate bird
    bird.rotation = bird.direction * 0.8;

		//Prevent bird from going above top of screen
		if (bird.y < 0) {
      bird.y = 0;
    }
    
    // if the bird hits the ground or pipe, it dies
		if (bird.y > 540 || bird.collides(pipes)) {
      die();
    }

		//Create new pipes every 60 frames (1 second)
		if (frameCount % 60 == 0) {
			let pos = random(0, 150);

      //Create a bottom pipe
			let bottomPipe = new pipes.Sprite();
			bottomPipe.x = width + bird.x;
			bottomPipe.y = ground.y - pos;

      //Create a top pipe
			let topPipe = new pipes.Sprite();
			topPipe.x = bottomPipe.x;
			topPipe.y = ground.y - pos - 510 - random(0, 80);
			topPipe.mirror.y = -1;
		}

		//Get rid of pipes when they reach the left side of screen
		for (let pipe of pipes) {
			if (pipe.x < bird.x - width / 2) {
				pipe.remove();
			}
		}

		//Wrap ground 
		if (camera.x > ground.x + width / 2) {
			ground.x += width;
		}
	}

  //The camera follows the bird's x axis movement
	camera.x = bird.x + 150;

	camera.off();
  background(135, 206, 235);
	camera.on();

  if (!gameOver) {
		camera.x = bird.x + 150;
		world.step();
	}

  //Add this line of code below if you add images to your program to help you debug. 
	//allSprites.debug = kb.pressing('d');
}

/* FUNCTIONS */
function die() {
  gameOver = true;
  canStartNewGame = true;
}

function newGame() {
	pipes.removeAll();
	gameOver = false;
	canStartNewGame = false;
	bird.x = width * 0.7;
	bird.y = height / 2;
	bird.vel.x = 4;
	bird.vel.y = 0;
	ground.x = width / 2;
	world.gravity.y = 24;
}