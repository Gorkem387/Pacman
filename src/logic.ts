/**
 * Checks if there are any dots left on the map
 * @param map The current game map
 * @returns true if no dots (0) are left
 */
export function isVictory(map: number[][]): boolean {
    return map.flat().filter(cell => cell === 0).length === 0;
}

/**
 * Calculates if two circular entities are colliding
 */
export function checkCollision(p1: {x: number, y: number, radius: number}, p2: {x: number, y: number, radius: number}): boolean {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < p1.radius + p2.radius;
}