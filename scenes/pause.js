export class PauseScene {
    constructor(game) {
        this.game = game;
        this.drawn = false;
        game.darkenCanvas(game.ctx);
    }

    update(ratio, keyboard, mouse) {
    }

    draw(ctx, drawSprite) {
        if (this.drawn) {return}
        ctx.fillStyle = "#000";
        ctx.fillRect(ctx.canvas.width / 4, (ctx.canvas.height / 2) - ctx.canvas.height / 6, ctx.canvas.width / 2, ctx.canvas.height / 4);
        ctx.fillStyle = "#fff";
        ctx.fillRect((ctx.canvas.width / 4) + 2, ((ctx.canvas.height / 2) - ctx.canvas.height / 6) + 2, (ctx.canvas.width / 2) - 4, (ctx.canvas.height / 4) - 4);
        ctx.font = "36pt Sans";
        ctx.fillStyle = "#000";
        ctx.fillText("Paused", ctx.canvas.width / 2 - 86, ctx.canvas.height / 2 - 6);
        this.drawn = true;
    }
}