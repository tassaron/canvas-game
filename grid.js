import { Thing } from "./thing.js";
const arrayOfLength = len => Array.apply(null, Array(len));

export class Grid {
    constructor(x, y, cols, rows, gridsize, cell=Thing) {
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;
        this.gridsize = gridsize;
        this._grid = arrayOfLength(rows);
        for (let y = 0; y < this.rows; y++) {
            this._grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this._grid[y][x] = new cell(gridsize * x, gridsize * y, gridsize, gridsize);
            }
        }
    }

    draw(ctx, drawSprite) {
        for (let row of this._grid) {
            for (let cell of row) {
                cell.draw(ctx, drawSprite);
            }
        }
    }

    update(ratio, keyboard, mouse) {
        for (let row of this._grid) {
            for (let cell of row) {
                cell.update(ratio, keyboard, mouse);
            }
        }
    }
}