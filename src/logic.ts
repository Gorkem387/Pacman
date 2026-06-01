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
 * BFS algorithm to find the next direction towards a target tile.
 * Explores the map dynamically layer by layer (Breadth-First Search).
 * * @param start - Starting tile {row, col}
 * @param target - Target tile {row, col}
 * @param map - The current game map matrix
 */
export function getNextMoveBFS(
    start: { row: number; col: number },
    target: { row: number; col: number },
    map: number[][]
): string | null {
    const queue: { row: number; col: number; firstMove: string | null }[] = [];
    const visited = new Set<string>();

    const directions = [
        { name: 'UP', r: -1, c: 0 },
        { name: 'DOWN', r: 1, c: 0 },
        { name: 'LEFT', r: 0, c: -1 },
        { name: 'RIGHT', r: 0, c: 1 }
    ];

    // Initialize: Push all immediate valid neighbors into the queue
    for (const dir of directions) {
        const nr = start.row + dir.r;
        const nc = start.col + dir.c;
        if (map[nr] && map[nr][nc] !== 1) {
            queue.push({ row: nr, col: nc, firstMove: dir.name });
            visited.add(`${nr},${nc}`);
        }
    }

    // Main exploration loop
    while (queue.length > 0) {
        const { row, col, firstMove } = queue.shift()!;

        // If target reached, return the direction we took at the very start
        if (row === target.row && col === target.col) {
            return firstMove;
        }

        // Check neighbors of the currently popped tile
        for (const dir of directions) {
            const nr = row + dir.r;
            const nc = col + dir.c;
            const key = `${nr},${nc}`;

            if (map[nr] && map[nr][nc] !== 1 && !visited.has(key)) {
                visited.add(key);
                queue.push({ row: nr, col: nc, firstMove });
            }
        }
    }

    return null; // No path found
}