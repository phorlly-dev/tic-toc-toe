import * as Phaser from "phaser";
import Objects from "../utils/objects";
import Helpers from "../utils/helpers";
import { EventBus } from "../../hooks/events";

class GameEngine extends Phaser.Scene {
    constructor() {
        super("GameEngine");
        this.board = Array(9).fill(null);
        this.currentPlayer = "O"; // Player starts
        this.gameOver = false;
        this.scores = { player: 0, bot: 0 };
        this.cells = [];
        this.winningLine = null;
        this.difficulty = "easy"; // default
    }

    create() {
        // 🔹 Emit lifecycle
        EventBus.emit("current-scene-ready", this);

        // Responsive board
        const { width, height } = this.scale;
        this.boardSize = Math.min(width, height);
        this.cellSize = this.boardSize / 3;
        this.startX = (width - this.boardSize) / 2;
        this.startY = (height - this.boardSize) / 2;

        Objects.createBoard(this);
        Objects.createParticles(this);

        // 🔹 Listen for React → Game events
        EventBus.on("game:reset", () => Helpers.resetGame(this), this);
        EventBus.on("sound:toggle", (mute) => (this.sound.mute = mute));
        EventBus.on("difficulty:change", (level) => (this.difficulty = level));

        // Example UI: scores start at 0
        EventBus.emit("score:update", { ...this.scores });

        Helpers.resizeBoard(this, this.scale.width, this.scale.height);
        this.scale.on("resize", (gameSize) => {
            Helpers.resizeBoard(this, gameSize.width, gameSize.height);
        });
    }
}

export default GameEngine;
