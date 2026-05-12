import { TILE_SIZE } from '../constants';

export class Ghost {
    x: number;
    y: number;
    radius: number;
    speed: number;
    direction: string;
    color: string;

    constructor(x: number, y: number, radius: number, speed: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        // Random direction at start
        const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
        this.direction = directions[Math.floor(Math.random() * directions.length)];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
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

        const r = this.radius - 2;
        const corners = [
            { x: nextX - r, y: nextY - r },
            { x: nextX + r, y: nextY - r },
            { x: nextX - r, y: nextY + r },
            { x: nextX + r, y: nextY + r },
        ];

        const collision = corners.some(corner => {
            const col = Math.floor(corner.x / TILE_SIZE);
            const row = Math.floor(corner.y / TILE_SIZE);
            return map[row]?.[col] === 1;
        });

        if (!collision) {
            this.x = nextX;
            this.y = nextY;
        } else {
            // Hit a wall, pick a random new direction
            const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
            this.direction = directions[Math.floor(Math.random() * directions.length)];
        }
    }
}