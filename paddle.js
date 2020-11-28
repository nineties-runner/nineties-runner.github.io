class Paddle {
    constructor(isLeft) {
        this.y = height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }
    }
    
    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }
    
    move(steps) {
        this.ychange = steps;
    }
    
    show() {
		let off = 10;
        fill(143, 235, 52);
        rectMode(CENTER);
		stroke(8);
        rect(this.x, this.y, this.w, this.h);
		fill(255, 255, 255, 150);
		rect(this.x, this.y, this.w-off, this.h-off);
    }
}
