import { Button } from "../button.js";
import { AnimatedThing } from "../thing.js";
import { Grid } from "../grid.js";

export class WorldScene {
    constructor(game) {
        this.game = game;
        this.button = new BoomButton(32, game.ctx.canvas.height - 132);
        this.grid = new Grid(game.ctx.canvas.width / 2, 32, 3, 3, 32, Boom);
    }

    update(ratio, keyboard, mouse) {
        this.grid.update(ratio, keyboard, mouse);
        this.button.update(ratio, keyboard, mouse);
        if (this.button.boom != null) {
            this.game.gameOver();
        }
    }

    draw(ctx, drawSprite) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.grid.draw(ctx, drawSprite);
        this.button.draw(ctx, drawSprite);
    }
}

class BoomButton extends Button {
    constructor(x, y) {
        let outline = "rgba(0, 0, 0, 1.0)";
        let colour = "rgba(0, 155, 45, 1.0)";
        super(x, y, 280, 100, "Game Over", outline, colour);
        this.boom = null;
    }

    update(ratio, keyboard, mouse) {
        Button.prototype.update.call(this, ratio, keyboard, mouse, this.spawnBoom, this);
        if (this.boom != null) {
            this.boom.update(ratio, keyboard, mouse);
            if (this.boom.loops > 0) {this.boom = null}
        }
    }

    draw(ctx, drawSprite) {
        Button.prototype.draw.call(this, ctx, drawSprite);
        if (this.boom != null) {
            this.boom.draw(ctx, drawSprite);
        }
    }

    spawnBoom(self) {
        self.boom = new Boom(self.x + self.width / 2, self.y);
    }
}

class Boom extends AnimatedThing {
    constructor(x, y) {
        super(x, y, 32, 32, 'explosion', 6, 4);
    }
}