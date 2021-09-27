import { WorldScene } from "./world.js";
import { Button } from "../button.js";

export class MenuScene {
    constructor(game) {
        this.button = new StartButton(game, game.ctx.canvas.width / 2 - 128, game.ctx.canvas.height / 2 - 32);
        this.game = game;
    }

    update(ratio, keyboard, mouse) {
        let changeScene = function(self) {
            self.game.changeScene(new WorldScene(self.game));
        }
        this.button.update(ratio, keyboard, mouse, changeScene, this);
    }

    draw(ctx, drawSprite) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.button.draw(ctx, drawSprite);
    }
}

class StartButton extends Button {
    constructor(game, x, y) {
        let outline = "rgba(0, 0, 0, 1.0)";
        let colour = "rgba(0, 55, 145, 1.0)";
        super(x, y, 256, 48, "Start Game", outline, colour);
        this.game = game;
    }
}