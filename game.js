import { MenuScene } from "./scenes/menu.js";
import { PauseScene } from "./scenes/pause.js";
import { GameOverScene } from "./scenes/gameover.js";

const fpsRatio = ms => { return Math.min(ms / (1000 / 60), 2) }
let then;

export class Game {
    constructor(ctx) {
        this.paused = false;
        this.game_over = false;
        then = Date.now();
        this.ctx = ctx;
        this.allowUserInput = true;
        this.timer = [0.0, function(){}, this];
        this.scene = new MenuScene(this);
        this.prevScene = this.scene;
    }

    update(keyboard, mouse) {
        let now = Date.now();
        let delta = now - then;
        let ratio = fpsRatio(delta);
        if (this.timer[0] > 0.0) {
            this.timer[0] -= ratio;
        } else if (this.timer[0] < 0.0) {
            this.timer[0] = 0.0;
            this.timer[1](this.timer[2]);
        }
        if (!this.allowUserInput) {
            mouse.leftClick = false;
            keyboard.p = false;
        }
        this.scene.update(ratio, keyboard, mouse);
        then = Date.now();
        if (!this.game_over && keyboard.p) {this.paused = !this.paused}
        if (this.paused && this.scene.isPausedScene !== true) {
            this.changeScene(new PauseScene(this, this.ctx));
        } else if (!this.paused && this.scene.isPausedScene) {
            let scene = this.prevScene;
            this.changeScene(scene);
        }
    }

    draw(ctx, drawSprite) {
        this.scene.draw(ctx, drawSprite);
    }

    setTimer(frames, func, self) {
        this.timer = [frames, func, self]
    }

    changeScene(scene) {
        let prevScene = this.scene;
        this.prevScene = prevScene;
        this.allowUserInput = false;
        this.timer = [10.0, function(self) {self.allowUserInput=true}, this];
        scene.isPausedScene = this.paused;
        this.scene = scene;
    }

    darkenCanvas(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    gameOver() {
        if (!this.game_over) {
            this.changeScene(new GameOverScene(this));
        }
    }
}