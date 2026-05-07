import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

canvas.width = 1000;
canvas.height = 600;

function drawTest() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(100, 100, 20, 0, Math.PI * 2);
  ctx.fill();
}

drawTest();