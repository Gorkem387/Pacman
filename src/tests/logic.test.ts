import { describe, it, expect } from 'vitest';
import { isVictory, checkCollision } from '../logic';

describe('Game Logic', () => {
    it('should confirm victory when no dots are left', () => {
        const emptyMap = [[1, 7], [7, 1]]; // 1 = wall, 7 = empty
        expect(isVictory(emptyMap)).toBe(true);
    });

    it('should not confirm victory when dots are present', () => {
        const mapWithDot = [[1, 0], [7, 1]]; // 0 = dot
        expect(isVictory(mapWithDot)).toBe(false);
    });

    it('should detect collision between Pacman and a Ghost', () => {
        const pacman = { x: 100, y: 100, radius: 10 };
        const ghost = { x: 105, y: 105, radius: 10 };
        expect(checkCollision(pacman, ghost)).toBe(true);
    });
});