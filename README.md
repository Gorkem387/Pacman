# 🟡 Pac-Man Clone

A modern Pac-Man clone built with **TypeScript**, created as a first project to learn and practice TypeScript after previously working with JavaScript.

The project focuses on clean architecture, scalable game systems, and smooth gameplay mechanics.

---

# 🚀 Features

## Core Mechanics
- ✅ Grid-based maze with smooth wall collisions
- ✅ Pac-Man animations (mouth movement)
- ✅ Modular and scalable architecture
- ✅ Responsive game loop
- ✅ Unit testing with Vitest
- ✅ Modern UI overlays (Start, Victory, Game Over)

---

# 🌟 Current Progress

## Gameplay & UI
- ✅ Start screen before launching the game
- ✅ Modern Game Over & Victory screens
- ✅ HUD and canvas rendering improvements

## Ghost System
- ⬜ Advanced Ghost AI (BFS pathfinding)
- ⬜ Unique ghost personalities
- ⬜ Smarter chase and escape behaviors

## Upcoming Features
- ⬜ Super Pellets
- ⬜ Level system with increasing difficulty
- ⬜ High score persistence using LocalStorage

---

# ⚡ Planned Power System

A future feature planned for the game is a **Power System**.

Before starting a match, the player will be able to choose a special ability.

### Planned Ideas
- 👻 **Invisibility:** Ghosts stop detecting Pac-Man for a few seconds
- ⚡ **Speed Boost:** Temporary movement speed increase
- 🛡️ **Shield:** Survive one ghost collision
- ⏱️ **Time Slow:** Slow down all ghosts temporarily

More powers and gameplay ideas will be added later.

---

# 🏗️ Project Architecture

The project follows a modular architecture to clearly separate game logic, rendering, and entity behavior.

```plaintext
src/
├── entities/
│   ├── Pacman.ts       # Pac-Man logic and animations
│   └── Ghost.ts        # Ghost behaviors and future AI
├── tests/
│   └── logic.test.ts   # Unit tests for pure logic
├── logic.ts            # Pure functions (collisions, win conditions)
├── renderer.ts         # Rendering engine (maze, HUD, overlays)
├── game.ts             # Main game loop and state manager
├── constants.ts        # Game configuration and map structure
├── main.ts             # Lightweight entry point
└── style.css           # Global canvas styles
```

---

# 🧪 Tech Stack

| Technology | Role |
|---|---|
| TypeScript | Main programming language |
| HTML5 Canvas | Rendering engine |
| CSS3 | Styling |
| Vite | Development environment |
| Vitest | Unit testing framework |

---

# 🎮 Controls

| Key | Action |
|---|---|
| ⬆️ ⬇️ ⬅️ ➡️ | Move Pac-Man |
| `ZQSD` | Alternative movement controls |
| `Any Key` | Start the game |
| `Any Key` | Restart after Game Over |

---

# 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Gorkem387/Pacman.git

# Install dependencies
npm install

# Start development server
npm run dev
```

---

# 🧪 Run Tests

```bash
npm run test
```

---

# 📌 Project Goals

This project was created to:
- Learn and practice TypeScript
- Transition from JavaScript to TypeScript
- Build a scalable game architecture
- Practice game loop and rendering systems
- Prepare a solid base for future gameplay features
