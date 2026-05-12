import './style.css'
import { COLORS, MAP, PACMAN_SPEED, TILE_SIZE } from './constants';
import { Pacman } from './entities/Pacman.ts';
import { Ghost } from './entities/Ghost.ts';

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

const gameMap = MAP.map(row => [...row]);
let score = 0;

canvas.width = gameMap[0].length * TILE_SIZE;
canvas.height = gameMap.length * TILE_SIZE;

const pacman = new Pacman(0, 0, 10, PACMAN_SPEED);

const ghosts = [
    new Ghost(1 * TILE_SIZE + TILE_SIZE / 2, 1 * TILE_SIZE + TILE_SIZE / 2, 10, 2, '#FF0000'),
    new Ghost(29 * TILE_SIZE + TILE_SIZE / 2, 1 * TILE_SIZE + TILE_SIZE / 2, 10, 2, '#FFB8FF'),
    new Ghost(1 * TILE_SIZE + TILE_SIZE / 2, 15 * TILE_SIZE + TILE_SIZE / 2, 10, 2, '#FFB852'),
];

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

function collectDot() {
    const col = Math.floor(pacman.x / TILE_SIZE);
    const row = Math.floor(pacman.y / TILE_SIZE);

    if (gameMap[row][col] === 0) {
        gameMap[row][col] = 7;
        score++;
        console.log('Score:', score);
    }
}

function drawScore() {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
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
    collectDot();
    drawMap();
    pacman.draw(ctx);
    ghosts.forEach(ghost => ghost.update(gameMap));
    ghosts.forEach(ghost => ghost.draw(ctx));
    drawScore();
    requestAnimationFrame(gameLoop);
}

initPacman();
gameLoop();