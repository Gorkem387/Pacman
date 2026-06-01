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

/**
 * Version 1.0: Only checks if the target is a direct neighbor.
 * 
 * @param start
 * @param target - The current target (Pac-Man).
 * @param map - The current game map.
 */
export function getNextMoveBFS(
    start: { row: number; col: number },
    target: { row: number; col: number },
    map: number[][]
): string | null {
    const directions = [
        { name: 'UP', r: -1, c: 0 },
        { name: 'DOWN', r: 1, c: 0 },
        { name: 'LEFT', r: 0, c: -1 },
        { name: 'RIGHT', r: 0, c: 1 }
    ];

    // Check all 4 directions around the ghost
    for (const dir of directions) {
        const nr = start.row + dir.r;
        const nc = start.col + dir.c;
        
        // If the neighboring tile is exactly the target (Pac-Man)
        if (nr === target.row && nc === target.col) {
            return dir.name; // Target found, return the direction
        }
    }

    return null; // Pac-Man is not nearby, fallback required
}