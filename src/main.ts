import './style.css'
import { COLORS, MAP, PACMAN_SPEED, TILE_SIZE } from './constants';
import { Pacman } from './entities/Pacman.ts';

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

const gameMap = MAP.map(row => [...row]);
let score = 0;

canvas.width = gameMap[0].length * TILE_SIZE;
canvas.height = gameMap.length * TILE_SIZE;

const pacman = new Pacman(0, 0, 10, PACMAN_SPEED);

// Find Pacman starting position from the MAP (called only once)
function initPacman() {
    for (let i = 0; i < gameMap.length; i++) {
        for (let j = 0; j < gameMap[i].length; j++) {
            if (gameMap[i][j] === 9) {
                pacman.x = j * TILE_SIZE + TILE_SIZE / 2;
                pacman.y = i * TILE_SIZE + TILE_SIZE / 2;
            }
        }
    }
}

function drawMap() {
    for (let i = 0; i < gameMap.length; i++) {
        for (let j = 0; j < gameMap[i].length; j++) {

            const x = j * TILE_SIZE;
            const y = i * TILE_SIZE;

            if (gameMap[i][j] === 1) {
                ctx.fillStyle = COLORS.WALL;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            } else if (gameMap[i][j] === 0) {
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
    pacman.update(gameMap);
    drawMap();
    pacman.draw(ctx);
    requestAnimationFrame(gameLoop);
}

initPacman();
gameLoop();