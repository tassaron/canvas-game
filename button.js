import { Thing } from "./thing.js";

export class Button extends Thing {
    constructor(x, y, w, h, text, outline="#000", colour="#fff") {
        super(x, y, w, h);
        this.text = text;
        this.outline = outline;
        this.colour = colour;
        this.cooldown = 0.0;
    }

    draw(ctx, drawSprite) {
        ctx.fillStyle = this.outline;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
        ctx.fillStyle = this.outline;
        ctx.font = "16pt Sans";
        ctx.fillText(this.text, this.x + ((this.width / 2) - (ctx.measureText(this.text).width / 2)), this.y + this.height / 2 + 8);
    }

    update(ratio, keyboard, mouse, func=this.leftClicked, self=this) {
        if (mouse.leftClick && this.cooldown == 0.0 && this.collides(mouse)) {
            func(self);
            this.cooldown = 30.0;
        } else if (this.cooldown < 0.0) {
            this.cooldown = 0.0;
        } else if (this.cooldown > 0.0) {
            this.cooldown -= ratio;
        }
    }

    leftClicked() {
        console.log("clicked");
    }
}