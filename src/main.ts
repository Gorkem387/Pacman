import './style.css'
import { COLORS, MAP, TILE_SIZE } from './constants';
import { Pacman } from './entities/Pacman.ts';

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

const pacman = new Pacman(100, 100, 10, 5);

canvas.width = MAP[0].length * TILE_SIZE;
canvas.height = MAP.length * TILE_SIZE;

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

drawMap();
pacman.draw(ctx);