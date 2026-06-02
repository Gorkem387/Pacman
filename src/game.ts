import { MAP, PACMAN_SPEED, TILE_SIZE } from './constants';
import { Pacman } from './entities/Pacman';
import { Ghost } from './entities/Ghost';
import { checkCollision, isVictory } from './logic';
import { drawMap, drawHUD, drawOverlay } from './renderer';

type GameState = 'START' | 'PLAYING' | 'GAME_OVER' | 'VICTORY';

/**
 * Main game controller.
 * Owns the canvas, all entities, and the game loop.
 * Call `start()` to initialise everything and begin rendering.
 */
export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private gameMap: number[][];
    private pacman: Pacman;
    private ghosts: Ghost[];

    private score: number = 0;
    private lives: number = 3;
    private state: GameState = 'START';

    private countdown: number = 0;
    private canRestart: boolean = false;

    private frightenedTimeout: any = null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        // Deep-copy MAP so the original is never mutated between reloads
        this.gameMap = MAP.map(row => [...row]);

        this.pacman = new Pacman(0, 0, 10, PACMAN_SPEED);
        this.ghosts = [
            new Ghost(1 * TILE_SIZE + TILE_SIZE / 2,  1 * TILE_SIZE  + TILE_SIZE / 2, 10, 2, '#FF0000', 'BLINKY'),
            new Ghost(29 * TILE_SIZE + TILE_SIZE / 2, 1 * TILE_SIZE  + TILE_SIZE / 2, 10, 2, '#FFB8FF', 'PINKY'),
            new Ghost(1 * TILE_SIZE + TILE_SIZE / 2,  15 * TILE_SIZE + TILE_SIZE / 2, 10, 2, '#FFB852', 'CLYDE'),
        ];
    }

    /** Sizes the canvas, places Pac-Man, binds keyboard input, and starts the loop. */
    public start(): void {
        this.canvas.width = this.gameMap[0].length * TILE_SIZE;
        this.canvas.height = this.gameMap.length * TILE_SIZE;

        this.placePacman();
        this.bindInput();
        this.loop();
    }

    // ─── Private helpers ───────────────────────────────────────────────────────

    /**
     * Finds the cell marked `9` in the map and positions Pac-Man on it.
     * Called once at startup and again after each life loss.
     */
    private placePacman(): void {
        for (let row = 0; row < this.gameMap.length; row++) {
            for (let col = 0; col < this.gameMap[row].length; col++) {
                if (this.gameMap[row][col] === 9) {
                    this.pacman.x = col * TILE_SIZE + TILE_SIZE / 2;
                    this.pacman.y = row * TILE_SIZE + TILE_SIZE / 2;
                }
            }
        }
    }
    
    /**
     * Resets all ghosts to their initial starting positions and directions.
     * Called at game startup and whenever Pac-Man loses a life.
     */
    private placeGhosts(): void {
        // Blinky (Red)
        this.ghosts[0].x = 1 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[0].y = 1 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[0].direction = 'LEFT';

        // Pinky (Pink)
        this.ghosts[1].x = 29 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[1].y = 1 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[1].direction = 'LEFT';

        // Clyde (Orange)
        this.ghosts[2].x = 1 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[2].y = 15 * TILE_SIZE + TILE_SIZE / 2;
        this.ghosts[2].direction = 'LEFT';
    }

    /**
     * Checks whether Pac-Man is standing on a dot and, if so,
     * removes it from the map and increments the score.
     */
    private collectDot(): void {
        const col = Math.floor(this.pacman.x / TILE_SIZE);
        const row = Math.floor(this.pacman.y / TILE_SIZE);

        if (this.gameMap[row][col] === 0) {
            this.gameMap[row][col] = 7; // 7 = collected dot (empty cell)
            this.score++;
        } else if (this.gameMap[row][col] === 2) {
            this.gameMap[row][col] = 7; // 7 = collected dot (empty cell)
            this.score += 50; // Super pellets give 50 points
            this.triggerFrightenedMode(); // Trigger the global panic state
        }
    }

    /**
     * Activates Frightened Mode for 7 seconds.
     * Resets the duration if another Super Pellet is eaten before expiration.
     */
    private triggerFrightenedMode(): void {
        // If a timer is already running, clear it to refresh the 7 seconds
        if (this.frightenedTimeout) {
            clearTimeout(this.frightenedTimeout);
        }

        // Tell all ghosts to enter frightened state
        this.ghosts.forEach(ghost => {
            ghost.isFrightened = true;
        });

        // Start a 7-second countdown (7000ms) to turn ghosts back to normal
        this.frightenedTimeout = setTimeout(() => {
            this.ghosts.forEach(ghost => {
                ghost.isFrightened = false;
            });
            this.frightenedTimeout = null;
            console.log("Frightened mode expired!");
        }, 7000);
    }

    /**
     * Tests each ghost against Pac-Man using circle-collision.
     * Deducts a life on hit; triggers GAME_OVER when lives reach zero,
     * otherwise respawns Pac-Man at the starting position.
     */
    private handleGhostCollisions(): void {
        this.ghosts.forEach(ghost => {
            if (checkCollision(this.pacman, ghost)) {
                this.lives--;
                if (this.lives <= 0) {
                    this.state = 'GAME_OVER';
                    this.startRestartCountdown();
                } else {
                    // Clear frightened timer if Pac-Man dies during the power-up
                    if (this.frightenedTimeout) {
                        clearTimeout(this.frightenedTimeout);
                        this.frightenedTimeout = null;
                    }
                    this.ghosts.forEach(ghost => ghost.isFrightened = false);

                    this.placePacman();
                    this.placeGhosts();
                }
            }
        });
    }

    /**
     * Checks if every dot has been collected.
     * Transitions to VICTORY when none remain.
     */
    private handleVictory(): void {
        if (isVictory(this.gameMap)) {
            this.state = 'VICTORY';
            this.startRestartCountdown();
        }
    }

    /**
     * Starts a 3-second countdown before the player can restart.
     * Sets `canRestart` to true when the countdown expires.
     */
    private startRestartCountdown(): void {
        this.countdown = 3;
        this.canRestart = false;

        const interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(interval);
                this.canRestart = true;
            }
        }, 1000);
    }

    /**
     * Attaches the keyboard listener that controls Pac-Man's direction
     * and handles state transitions (start / restart).
     */
    private bindInput(): void {
        window.addEventListener('keydown', (e) => {
            if (this.state === 'GAME_OVER' || this.state === 'VICTORY') {
                if (this.canRestart) document.location.reload();
                return;
            }

            if (this.state === 'START') {
                this.state = 'PLAYING';
                return;
            }

            if (e.key === 'ArrowUp'    || e.key === 'z') this.pacman.direction = 'UP';
            if (e.key === 'ArrowDown'  || e.key === 's') this.pacman.direction = 'DOWN';
            if (e.key === 'ArrowLeft'  || e.key === 'q') this.pacman.direction = 'LEFT';
            if (e.key === 'ArrowRight' || e.key === 'd') this.pacman.direction = 'RIGHT';
        });
    }

    // ─── Game loop ─────────────────────────────────────────────────────────────

    /** Main render/update loop — called every animation frame via rAF. */
    private loop(): void {
        const { ctx, canvas } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        switch (this.state) {
            case 'START':
                drawMap(ctx, this.gameMap);
                drawOverlay(ctx, canvas.width, canvas.height, 'PAC-MAN', 'Press any key to start', '#FFFF00');
                break;

            case 'PLAYING':
                this.pacman.update(this.gameMap);
                this.collectDot();
                this.handleGhostCollisions();
                this.handleVictory();
                drawMap(ctx, this.gameMap);
                this.pacman.draw(ctx);
                this.ghosts.forEach(g => { g.update(this.gameMap, this.pacman); g.draw(ctx); });
                drawHUD(ctx, this.score, this.lives);
                break;

            case 'GAME_OVER': {
                drawMap(ctx, this.gameMap);
                const msg = this.canRestart ? 'Press any key to restart' : `Restart in ${this.countdown}...`;
                drawOverlay(ctx, canvas.width, canvas.height, 'GAME OVER', `Score: ${this.score} - ${msg}`, '#FF0000');
                break;
            }

            case 'VICTORY': {
                const msg = this.canRestart ? 'Press any key to restart' : `Restart in ${this.countdown}...`;
                drawOverlay(ctx, canvas.width, canvas.height, 'YOU WIN!', `Score: ${this.score} - ${msg}`, '#00FF00');
                break;
            }
        }

        requestAnimationFrame(() => this.loop());
    }
}