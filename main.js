"use strict"
import { addEventListeners, keyboard, mouse } from "./ui.js";
import { Game } from "./game.js";
/*
*  Create the canvas
*/
const gamediv = document.getElementById("game");
const canvas = document.createElement("canvas");
gamediv.appendChild(canvas);
canvas.width = gamediv.offsetWidth; canvas.height = gamediv.offsetHeight;
const ctx = canvas.getContext("2d");
let game;

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
        game = new Game(ctx);
        loop();
    }
}

sprites.explosion.addEventListener("load", preload_success)
sprites.explosion.src = "assets/explosion.png";


function pauseGame() {
    if (!game.game_over) {
        game.paused = !game.paused;
    }
}

function loop() {
    game.update(keyboard, mouse);
    game.draw(ctx, drawSprite);
    requestAnimationFrame(loop);
}
document.getElementById("pause_button").addEventListener('click', pauseGame, false);