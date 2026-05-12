import { TILE_SIZE } from '../constants';

export class Pacman {
    x: number;
    y: number;
    radius: number;
    speed: number;
    direction: string;
    mouthAngle: number = 0;
    mouthOpen: boolean = true;

    constructor(x: number, y: number, radius: number, speed: number, direction: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.direction = '';
    }

    draw(ctx: CanvasRenderingContext2D) {
    // Update mouth animation
    if (this.mouthOpen) {
        this.mouthAngle += 0.03;
        if (this.mouthAngle >= 0.25) this.mouthOpen = false;
    } else {
        this.mouthAngle -= 0.03;
        if (this.mouthAngle <= 0) this.mouthOpen = true;
    }

    // Calculate rotation based on direction
    let rotation = 0;
    if (this.direction === 'UP') rotation = -Math.PI / 2;
    if (this.direction === 'DOWN') rotation = Math.PI / 2;
    if (this.direction === 'LEFT') rotation = Math.PI;
    if (this.direction === 'RIGHT') rotation = 0;

    ctx.save(); // save canvas state
    ctx.translate(this.x, this.y); // move origin to Pacman's center
    ctx.rotate(rotation); // rotate

    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, this.mouthAngle * Math.PI, (2 - this.mouthAngle) * Math.PI);
    ctx.lineTo(0, 0);
    ctx.fill();

    ctx.restore(); // restore canvas state
}

    update(map: number[][]) {
        let nextX = this.x;
        let nextY = this.y;

        if (this.direction === 'UP') nextY -= this.speed;
        if (this.direction === 'DOWN') nextY += this.speed;
        if (this.direction === 'LEFT') nextX -= this.speed;
        if (this.direction === 'RIGHT') nextX += this.speed;

        // Check all 4 edges of Pacman's circle
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
        }
    }
}