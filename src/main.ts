import './style.css';
import { Game } from './game';

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;

new Game(canvas).start();