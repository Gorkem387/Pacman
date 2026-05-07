export class Pacman {
    x: number;
    y: number;
    radius: number;
    speed: number;

    constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}