let leftscore = 0;
let rightscore = 0;
let menu = 1;
let timer = 60;
let fontRegular;
let colorshift = 0;

function preload() {
  fontRegular = loadFont('assets/playtime.ttf');
}

function setup() {
  bg = loadImage('bg.png');
  createCanvas(800, 600);
  gameDiff = createSlider(1, 3, 2, 1);
  gameDiff.position(width / 2 - 75, 180);
  sizeSlider = createSlider(1, 32, 12, 0.1);
  sizeSlider.position(width / 2 - 75, 110);
  colorR = createSlider(0, 255, 255, 1);
  colorR.position(width / 2 - 75, 20);
  colorG = createSlider(0, 255, 255, 1);
  colorG.position(width / 2 - 75, 50);
  colorB = createSlider(0, 255, 255, 1);
  colorB.position(width / 2 - 75, 80);
  sizeSlider.style('visibility', 'hidden');
  colorR.style('visibility', 'hidden');
  colorG.style('visibility', 'hidden');
  colorB.style('visibility', 'hidden');
  gameDiff.style('visibility', 'hidden');
  beginGame = new Clickable();
  beginGame.locate(width / 2 - 50, 120);
  beginGame.text = 'START GAME';
  beginGame.textFont = fontRegular;
  beginGame.onPress = function() {
    ball.reset();
    ball2.reset();
    menu = 0;
    timer = 60;
  }
  endGame = new Clickable();
  endGame.text = 'MAIN MENU';
  endGame.resize(100, 50);
  endGame.locate(width / 2 - 50, -10);
  endGame.color = '#FFF';
  endGame.textFont = fontRegular;
  endGame.onPress = function() {
    menu = 1;
    ball.reset();
    left.y = height / 2;
    right.y = height / 2;
    leftscore = 0;
    rightscore = 0;
  }
  settingsMenu = new Clickable();
  settingsMenu.text = 'SETTINGS';
  settingsMenu.resize(100, 50);
  settingsMenu.locate(width / 2 - 50, 200);
  settingsMenu.color = '#FFF';
  settingsMenu.textFont = fontRegular;
  settingsMenu.onPress = function() {
    menu = 2;
    sizeSlider.style('visibility', 'visible');
    colorR.style('visibility', 'visible');
    colorG.style('visibility', 'visible');
    colorB.style('visibility', 'visible');
    gameDiff.style('visibility', 'visible');
  }
  backToMenu = new Clickable();
  backToMenu.text = 'MAIN MENU';
  backToMenu.resize(100, 50);
  backToMenu.locate(width / 2 - 50, 250);
  backToMenu.color = '#FFF';
  backToMenu.textFont = fontRegular;
  backToMenu.onPress = function() {
    menu = 1;
    sizeSlider.style('visibility', 'hidden');
    colorR.style('visibility', 'hidden');
    colorG.style('visibility', 'hidden');
    colorB.style('visibility', 'hidden');
    gameDiff.style('visibility', 'hidden');
  }
  ball = new Ball();
  ball2 = new Ball();
  left = new Paddle(true);
  right = new Paddle(false);
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
    background(bg);
	tint(cos(colorshift)*255, sin(colorshift)*255, cos(colorshift)*255);
	colorshift = colorshift + 0.01;
    rectMode(CORNER);
    beginGame.draw();
    settingsMenu.draw();
  } else if (menu == 2) {
    background(0);
    backToMenu.draw();
    fill(255);
    textAlign(RIGHT);
    textFont(fontRegular);
    text('RED', colorR.x - 10, colorR.y + 5);
    text('GREEN', colorG.x - 10, colorG.y + 5);
    text('BLUE', colorB.x - 10, colorB.y + 5);
    text('BALL SIZE', sizeSlider.x - 10, sizeSlider.y + 5);
    text('GAME DIFFICULTY', gameDiff.x - 10, gameDiff.y + 5);
    fill(colorR.value(), colorG.value(), colorB.value());
    ellipse(colorG.x + 300, colorG.y + 10, sizeSlider.value() * 2);
  }
}

function gameUpdate() {
  frameRate = 1;
  background(bg);
	tint(cos(colorshift)*255, sin(colorshift)*255, 255);
	colorshift = colorshift + 0.01;
  rectMode(CORNER);
  endGame.draw();
  if (gameDiff.value() == 3) {
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
  text(rightscore, width - 64, 40);
  fill(0, 255, 0);
  text(timer, width / 2, height / 2);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer == 0) {
    text("GAME OVER", width / 2, height * 0.7);
    if (leftscore > rightscore) {
      text("PLAYER 1 WON!", width / 2, height * 0.8);
    } else if (leftscore < rightscore) {
      text("PLAYER 2 WON!", width / 2, height * 0.8);
    } else {
      text("IT'S A TIE!", width / 2, height * 0.8);
    }
  }
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