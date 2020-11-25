class Ball {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;
        if (gameDiff.value() == 1){
			this.speed = 4;
		} else if (gameDiff.value() == 2){
			this.speed = 6;
		} else if (gameDiff.value() == 3){
			this.speed = 7;
		}
        this.reset();
    }
    
    checkPaddleLeft(p) {
        if (this.y - this.r < p.y + p.h/2 &&
            this.y + this.r > p.y - p.h/2 &&
            this.x - this.r < p.x + p.w/2) {
                
            if (this.x > p.x) {
                let diff = this.y - (p.y - p.h/2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.xspeed = this.speed * cos(angle);
                this.yspeed = this.speed * sin(angle);
                this.x = p.x + p.w/2 + this.r;
            }
            
        }
    }
	
    checkPaddleRight(p) {
        if (this.y - this.r < p.y + p.h/2 &&
            this.y + this.r > p.y - p.h/2 &&
            this.x + this.r > p.x - p.w/2) {
                
            if (this.x < p.x) {
                let diff = this.y - (p.y - p.h/2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.xspeed = this.speed * cos(angle);
                this.yspeed = this.speed * sin(angle);
                this.x = p.x - p.w/2 - this.r;
            }
        }
    }
	
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
	
    reset() {
        this.x = width/2;
        this.y = height/2;
        let angle = random(-PI/4, PI/4);
		if (gameDiff.value() == 1){
			this.speed = 4;
		} else if (gameDiff.value() == 2){
			this.speed = 6;
		} else if (gameDiff.value() == 3){
			this.speed = 7;
		}
        this.xspeed = this.speed * Math.cos(angle);
        this.yspeed = this.speed * Math.sin(angle);
        
        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
		
		
    }
    
    edges() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }
        
        if (this.x - this.r > width) {
			if (timer !== 0) {
            leftscore++;
			}
            this.reset();
        }
        
        if (this.x + this.r < 0) {
            if (timer !== 0) {
			rightscore++;
			}
            this.reset();
        }
    }
    
    show() {
		if (gameDiff.value() == 1){
			this.speed = 4;
		} else if (gameDiff.value() == 2){
			this.speed = 6;
		} else if (gameDiff.value() == 3){
			this.speed = 7;
		}
        fill(colorR.value(), colorG.value(), colorB.value());
        ellipse(this.x, this.y, this.r*2);
		fill(255, 255, 255, 100);
		ellipse(this.x, this.y, (this.r*2)/2);
    }
	
}
