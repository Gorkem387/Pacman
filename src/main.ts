import './style.css'
import { COLORS, MAP, TILE_SIZE } from './constants';
import { Pacman } from './entities/Pacman.ts';

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

canvas.width = MAP[0].length * TILE_SIZE;
canvas.height = MAP.length * TILE_SIZE;

const pacman = new Pacman(0, 0, 10, 5);

// Find Pacman starting position from the MAP (called only once)
function initPacman() {
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {
            if (MAP[i][j] === 9) {
                pacman.x = j * TILE_SIZE + TILE_SIZE / 2;
                pacman.y = i * TILE_SIZE + TILE_SIZE / 2;
            }
        }
    }
}

function drawMap() {
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {

            const x = j * TILE_SIZE;
            const y = i * TILE_SIZE;

            if (MAP[i][j] === 1) {
                ctx.fillStyle = COLORS.WALL;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            } else if (MAP[i][j] === 0) {
                ctx.fillStyle = COLORS.DOT;
                ctx.beginPath();
                ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') pacman.direction = 'UP';
    if (e.key === 'ArrowDown') pacman.direction = 'DOWN';
    if (e.key === 'ArrowLeft') pacman.direction = 'LEFT';
    if (e.key === 'ArrowRight') pacman.direction = 'RIGHT';
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pacman.update(MAP);
    drawMap();
    pacman.draw(ctx);
    requestAnimationFrame(gameLoop);
}

initPacman();
gameLoop();