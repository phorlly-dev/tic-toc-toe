import * as Phaser from "phaser";
import { EventBus } from "../../hooks/events";
import { resetGame, resizeBoard } from "../utils/helpers";
import { createBoard, createParticles } from "../utils/objects";

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
        this.boardSize = 0;
        this.cellSize = 0;
        this.startX = 0;
        this.startY = 0;
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

        createBoard(this);
        createParticles(this);

        // 🔹 Listen for React → Game events
        EventBus.on("game:reset", () => {
            resetGame(this);
            this.sound.play("reset");
        });
        EventBus.on("sound:toggle", (mute) => {
            this.sound.mute = mute;
            this.sound.play("close");
        });
        EventBus.on("difficulty:change", (level) => (this.difficulty = level));

        resizeBoard(this, this.scale.width, this.scale.height);
        this.scale.on("resize", (gameSize) => {
            resizeBoard(this, gameSize.width, gameSize.height);
        });
    }

    update() {
        EventBus.emit("score:update", { ...this.scores });
    }
}

export default GameEngine;
