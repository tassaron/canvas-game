"use strict"
/*
*  Create the canvas
*/
const gamediv = document.getElementById("game");
const canvas = document.createElement("canvas");
gamediv.appendChild(canvas);
canvas.width = gamediv.offsetWidth; canvas.height = gamediv.offsetHeight;
const ctx = canvas.getContext("2d");

/*
*  Preload assets
*/
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "48pt Sans";
ctx.fillStyle = "#fff";
ctx.fillText("loading", (canvas.width / 2) - (ctx.measureText("loading").width / 2), (canvas.height / 2) - (canvas.height / 6));
let preloaded = 0;

let sprites = {
    explosion: new Image()
}

const drawSprite = {
    explosion: function(i, x, y) {ctx.drawImage(sprites.explosion, 32 * i, 0, 32, 32, Math.floor(x), Math.floor(y), 32, 32)}
};

function preload_success() {
    preloaded += 1;
    if (preloaded == Object.keys(sprites).length) {
        addEventListeners(canvas);
        game = new Game();
        game.loop();
    }
}

sprites.explosion.addEventListener("load", preload_success)
sprites.explosion.src = "assets/explosion.png";

/*
*  Imports
*/
import { addEventListeners, keyboard, mouse } from "./ui.js";
import { MenuScene } from "./scenes/menu.js";
import { PauseScene } from "./scenes/pause.js";
import { GameOverScene } from "./scenes/gameover.js";

const fpsRatio = ms => { return Math.min(ms / (1000 / 60), 2) }
let game, then;

class Game {
    constructor() {
        this.paused = false;
        this.game_over = false;
        then = Date.now();
        this.ctx = ctx;
        this.allowUserInput = true;
        this.timer = [0.0, function(){}, this];
        this.scene = new MenuScene(this);
        this.prevScene = this.scene;
        document.getElementById("pause_button").addEventListener('click', pauseGame, false);
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
        if (!this.game_over && keyboard.p) {pauseGame()}
        if (this.paused && this.scene.isPausedScene !== true) {
            this.changeScene(new PauseScene(this, ctx));
        } else if (!this.paused && this.scene.isPausedScene) {
            let scene = this.prevScene;
            this.changeScene(scene);
        }
    }

    draw(ctx, drawSprite) {
        this.scene.draw(ctx, drawSprite);
    }

    loop() {
        game.update(keyboard, mouse);
        game.draw(ctx, drawSprite);
        requestAnimationFrame(game.loop);
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
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    gameOver() {
        if (!this.game_over) {
            this.changeScene(new GameOverScene(this));
        }
    }
}

function pauseGame() {
    if (!game.game_over) {
        game.paused = !game.paused;
    }
}