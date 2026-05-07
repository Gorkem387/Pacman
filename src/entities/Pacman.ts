import { TILE_SIZE } from '../constants';

export class Pacman {
    x: number;
    y: number;
    radius: number;
    speed: number;
    direction: String;

    constructor(x: number, y: number, radius: number, speed: number, direction: String) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.direction = '';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(map: number[][]) {
        let nextX = this.x;
        let nextY = this.y;

        if (this.direction === 'UP') nextY -= this.speed;
        if (this.direction === 'DOWN') nextY += this.speed;
        if (this.direction === 'LEFT') nextX -= this.speed;
        if (this.direction === 'RIGHT') nextX += this.speed;

        const col = Math.floor(nextX / TILE_SIZE);
        const row = Math.floor(nextY / TILE_SIZE);

        if (map[row][col] !== 1) {
            this.x = nextX;
            this.y = nextY;
        }
    }
}