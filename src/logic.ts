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
 * Version 2.0: Checks 1 and 2 tiles away from the ghost.
 * Returns the immediate direction ('UP', 'DOWN', etc.) to reach the target.
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

    // Check immediate neighbors (1 tile away)
    for (const dir1 of directions) {
        const r1 = start.row + dir1.r;
        const c1 = start.col + dir1.c;

        // Verify the tile exists and is not a wall
        if (map[r1] && map[r1][c1] !== 1) {
            // If Pac-Man is right here, return this direction immediately
            if (r1 === target.row && c1 === target.col) {
                return dir1.name;
            }
        }
    }

    // Check neighbors of neighbors (2 tiles away)
    for (const dir1 of directions) {
        const r1 = start.row + dir1.r;
        const c1 = start.col + dir1.c;

        // Only search deeper if the first step is valid (not a wall)
        if (map[r1] && map[r1][c1] !== 1) {
            
            // From this neighbor, check its own 4 directions
            for (const dir2 of directions) {
                const r2 = r1 + dir2.r;
                const c2 = c1 + dir2.c;

                if (map[r2] && map[r2][c2] !== 1) {
                    if (r2 === target.row && c2 === target.col) {
                        // Target found 2 tiles away
                        // Return dir1.name because that's the FIRST step to get there
                        return dir1.name; 
                    }
                }
            }
        }
    }
    return null; // Pac-Man is still too far away
}