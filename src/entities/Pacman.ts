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

    update() {
    if (this.direction === 'UP') this.y -= this.speed;
    if (this.direction === 'DOWN') this.y += this.speed;
    if (this.direction === 'LEFT') this.x -= this.speed;
    if (this.direction === 'RIGHT') this.x += this.speed;
}
}