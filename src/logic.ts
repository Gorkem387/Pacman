/**
 * Pure game-logic functions.
 * No canvas, no DOM — only data in, boolean/void out.
 * This makes them straightforward to unit-test with Vitest.
 */

interface Circle {
    x: number;
    y: number;
    radius: number;
}

/**
 * Returns true when two circular entities overlap.
 * Uses simple Euclidean distance between centres.
 *
 * @param a - First circle (e.g. Pac-Man).
 * @param b - Second circle (e.g. a ghost).
 */
export function checkCollision(a: Circle, b: Circle): boolean {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) < a.radius + b.radius;
}

/**
 * Returns true when no dots (cell value `0`) remain on the map.
 * A cell becomes `7` when Pac-Man collects its dot.
 *
 * @param map - The current game map.
 */
export function isVictory(map: number[][]): boolean {
    return map.flat().every(cell => cell !== 0);
}