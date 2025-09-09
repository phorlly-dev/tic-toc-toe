import * as Phaser from "phaser";
import gameEvents from "../utils/events";
import Objects from "../utils/objects";
import Helpers from "../utils/helpers";

class GameEngine extends Phaser.Scene {
    constructor() {
        super("GameEngine");
        this.board = Array(9).fill(null);
        this.currentPlayer = "O"; // Player starts
        this.gameOver = false;
        this.scores = { player: 0, bot: 0 };
        this.cells = [];
        this.winningLine = null;
    }

    create() {
        // Responsive board
        const { width, height } = this.scale;
        this.boardSize = Math.min(width, height);
        this.cellSize = this.boardSize / 3;
        this.startX = (width - this.boardSize) / 2;
        this.startY = (height - this.boardSize) / 2;

        Objects.createBoard(this);
        Objects.createParticles(this);

        // React → Phaser listeners
        gameEvents.on("game:reset", () => this.resetGame());
        gameEvents.on("sound:toggle", (mute) => {
            this.sound.mute = mute;
        });

        // Initial emit to React
        gameEvents.emit("score:update", this.scores);

        Helpers.resizeBoard(this, this.scale.width, this.scale.height);
        this.scale.on("resize", (gameSize) => {
            Helpers.resizeBoard(this, gameSize.width, gameSize.height);
        });
    }
}

export default GameEngine;
