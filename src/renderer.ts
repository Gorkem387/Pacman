import { COLORS, TILE_SIZE } from './constants';

/**
 * Draws the game map on the canvas.
 * Renders walls as filled blue rectangles and dots as small white circles.
 *
 * @param ctx   - The 2D rendering context of the canvas.
 * @param map   - The current game map (2D array of cell values).
 */
export function drawMap(ctx: CanvasRenderingContext2D, map: number[][]): void {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const x = col * TILE_SIZE;
            const y = row * TILE_SIZE;

            if (map[row][col] === 1) {
                ctx.fillStyle = COLORS.WALL;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            } else if (map[row][col] === 0) {
                ctx.fillStyle = COLORS.DOT;
                ctx.beginPath();
                ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

/**
 * Draws the HUD (score and remaining lives) at the top of the canvas.
 *
 * @param ctx   - The 2D rendering context of the canvas.
 * @param score - The current player score.
 * @param lives - The number of lives remaining.
 */
export function drawHUD(ctx: CanvasRenderingContext2D, score: number, lives: number): void {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 50, 20);
    ctx.fillText('Lives: ' + lives, 140, 20);
}

/**
 * Draws a semi-transparent overlay with a title and subtitle.
 * Used for the start screen, game over, and victory screens.
 *
 * @param ctx      - The 2D rendering context of the canvas.
 * @param width    - The canvas width (used to center the text).
 * @param height   - The canvas height (used to center the text).
 * @param title    - The large title text to display.
 * @param subtitle - The smaller subtitle text displayed below the title.
 * @param color    - The color of the title text.
 */
export function drawOverlay(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    title: string,
    subtitle: string,
    color: string
): void {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.font = 'bold 40px Arial';
    ctx.fillText(title, width / 2, height / 2 - 20);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText(subtitle, width / 2, height / 2 + 30);
}