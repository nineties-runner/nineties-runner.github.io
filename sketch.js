// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;
let menu = 1;

function setup() {
    createCanvas(800, 600);
	gameDiff = 1;
	fps = createSlider(3, 8, 5, 1);
	fps.position(width/2-75, 160);
    ball = new Ball();
	ball2 = new Ball();
    left = new Paddle(true);
    right = new Paddle(false);
	sizeSlider = createSlider(1, 32, 12, 0.1);
	sizeSlider.position(width/2-75, 190);
	colorR = createSlider(0, 255, 255, 1);
	colorR.position(width/2-75, 20);
	colorG = createSlider(0, 255, 255, 1);
	colorG.position(width/2-75, 50);
	colorB = createSlider(0, 255, 255, 1);
	colorB.position(width/2-75, 80);
	
		sizeSlider.style('visibility', 'hidden');
		colorR.style('visibility', 'hidden');
		colorG.style('visibility', 'hidden');
		colorB.style('visibility', 'hidden');
		fps.style('visibility', 'hidden');
	
	beginGame = new Clickable();
	beginGame.locate(width/2-50, 120);
	beginGame.text = 'START GAME';
	beginGame.onPress = function(){
		menu = 0;
	}
	endGame = new Clickable();
	endGame.text = 'MAIN MENU';
	endGame.resize(100,50);
	endGame.locate(width/2-50, -10);
	endGame.color = '#FF000099';
	endGame.onPress = function(){
		menu = 1;
		ball.reset();
		left.y = height/2;
		right.y = height/2;
		leftscore = 0;
		rightscore = 0;
	}
	settingsMenu = new Clickable();
	settingsMenu.text = 'SETTINGS';
	settingsMenu.resize(100,50);
	settingsMenu.locate(width/2-50, 200);
	settingsMenu.color = '#FFF';
	settingsMenu.onPress = function(){
		menu = 2;
		sizeSlider.style('visibility', 'visible');
		colorR.style('visibility', 'visible');
		colorG.style('visibility', 'visible');
		colorB.style('visibility', 'visible');
		fps.style('visibility', 'visible');
	}
	backToMenu = new Clickable();
	backToMenu.text = 'MAIN MENU';
	backToMenu.resize(100,50);
	backToMenu.locate(width/2-50, 250);
	backToMenu.color = '#FFF';
	backToMenu.onPress = function(){
		menu = 1;
		sizeSlider.style('visibility', 'hidden');
		colorR.style('visibility', 'hidden');
		colorG.style('visibility', 'hidden');
		colorB.style('visibility', 'hidden');
		fps.style('visibility', 'hidden');
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
		rectMode(CORNER);
		beginGame.draw();
		settingsMenu.draw();
	} else if (menu == 2) {
		background(0);
		backToMenu.draw();
		fill(255);
		textAlign(RIGHT);
		text('RED', colorR.x - 10, colorR.y+5);
		text('GREEN', colorG.x - 10, colorG.y+5);
		text('BLUE', colorB.x - 10, colorB.y+5);
		text('BALL SIZE', sizeSlider.x - 10, sizeSlider.y+5);
		text('GAME SPEED', fps.x - 10, fps.y+5);
	}
}

function gameUpdate() {
	frameRate = 1;
	background(0);
	rectMode(CORNER);	
	endGame.draw();
	if (gameDiff == 3) {
		ball.checkPaddleRight(right);
		ball.checkPaddleLeft(left);
		ball.r = sizeSlider.value();
		ball.update();
		ball.edges();
		ball.show();
		ball2.checkPaddleRight(right);
		ball2.checkPaddleLeft(left);
		ball2.r = sizeSlider.value();
		ball2.update();
		ball2.edges();
		ball2.show();
	} else {
		ball.checkPaddleRight(right);
		ball.checkPaddleLeft(left);
		ball.r = sizeSlider.value();
		ball.update();
		ball.edges();
		ball.show();
	}
	left.show();
	right.show();
	left.update();
	right.update();
	fill(255);
	textSize(32);
	text(leftscore, 32, 40);
	text(rightscore, width-64, 40);
	fill(0, 255, 0);
	text(fps.value(), width/2, 40);
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

