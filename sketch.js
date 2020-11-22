// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;
let menu = 1;

function setup() {
    createCanvas(600, 400);
	fps = createSlider(1, 5, 3, 1);
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
	sizeSlider = createSlider(1, 32, 12, 0.1);
	colorR = createSlider(0, 255, 255, 1);
	colorG = createSlider(0, 255, 255, 1);
	colorB = createSlider(0, 255, 255, 1);
	beginGame = new Clickable();
	beginGame.locate(width/2, 120);
	beginGame.text = '';
	beginGame.onPress = function(){
		menu = 0;
	}
	endGame = new Clickable();
	endGame.locate(width/2, 0);
	endGame.text = '';
	endGame.color = '#FF0000';
	endGame.onPress = function(){
		menu = 1;
	}
}

function draw() {	
	if (menu == 0) {
		gameUpdate();
	} else {
		menuUpdate();
	}
	// console.log(mouseX, mouseY);
}

function menuUpdate() {
	if (menu == 1) {
		background(0);
		beginGame.draw();
	} else if (menu == 2) {
		background(0);
	}
}

function gameUpdate() {
	frameRate = 1;
	background(0);
	puck.checkPaddleRight(right);
	puck.checkPaddleLeft(left);
	puck.r = sizeSlider.value();
	left.show();
	right.show();
	left.update();
	right.update();
	puck.update();
	puck.edges();
	puck.show();
	fill(255);
	textSize(32);
	text(leftscore, 32, 40);
	text(rightscore, width-64, 40);
	fill(0, 255, 0);
	text(fps.value(), width/2, 40);
	endGame.draw();
}

function keyReleased() {
    //console.log(key);
    if (key == 'A' ||
		key == 'a') {
        left.move(0);
    } else if (key == 'Z' ||
		key == 'z') {
        left.move(0);
    }

    if (key == 'J' ||
		key == 'j') {
        right.move(0);
    } else if (key == 'M' ||
		key == 'm') {
        right.move(0);
    }
}

function keyPressed() {
    //console.log(key);
    if (key == 'A' ||
		key == 'a') {
        left.move(-10);
    } else if (key == 'Z' ||
		key == 'z') {
        left.move(10);
    }

    if (key == 'J' || 
		key == 'j') {
        right.move(-10);
    } else if (key == 'M' ||
		key == 'm') {
        right.move(10);
    }
}

