export class Thing {
    constructor(x, y, width, height, src=null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.src = src;
    }

    draw(ctx, drawSprite) {
        if (this.src == null) {return}
        drawSprite[this.src](this.x, this.y);
    }


    collides(other) {
        return (this.x + this.width > other.x && this.x < other.x + other.width && other.y + other.height > this.y && other.y < this.y + this.height);
    }
}


export class AnimatedThing extends Thing {
    constructor(x, y, width, height, src, animFrames, animTiming) {
        super(x, y, width, height, src);
        this.animFrames = animFrames;
        this.animTiming = animTiming;
        this.anim = 0.0;
        this.loops = 0;
    }

    update(ratio, keyboard, mouse) {
        this.anim += ratio;
        if (this.anim > this.animFrames * this.animTiming) {this.anim = 0.0; this.loops++;}
    }

    draw(ctx, drawSprite) {
        let frame = Math.floor(this.anim / this.animTiming);
        drawSprite[this.src](frame, this.x, this.y);
    }
}