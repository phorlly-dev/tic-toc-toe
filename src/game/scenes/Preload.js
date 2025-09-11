import * as Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        try {
            this.createNeonTextures();
            this.load.setPath("assets/sounds/");
            this.load.audio("click", "click.wav");
            this.load.audio("draw", "draw.wav");
            this.load.audio("lose", "lose.wav");
            this.load.audio("win", "win.wav");
            this.load.audio("close", "close.wav");
            this.load.audio("reset", "reset.wav");
        } catch (error) {
            console.error(`The assets loaded failed: ${error}`);
        }
    }

    create() {
        this.scene.start("GameEngine");
    }

    createNeonTextures() {
        // X
        const xGraphics = this.add.graphics();
        xGraphics.lineStyle(8, 0x00ffff);
        xGraphics.beginPath();
        xGraphics.moveTo(10, 10);
        xGraphics.lineTo(50, 50);
        xGraphics.moveTo(50, 10);
        xGraphics.lineTo(10, 50);
        xGraphics.strokePath();
        xGraphics.generateTexture("neonX", 60, 60);
        xGraphics.destroy();

        // O
        const oGraphics = this.add.graphics();
        oGraphics.lineStyle(8, 0xff00ff);
        oGraphics.strokeCircle(30, 30, 20);
        oGraphics.generateTexture("neonO", 60, 60);
        oGraphics.destroy();

        // Cell background
        const cellBg = this.add.graphics();
        cellBg.fillStyle(0x2a0066, 0.3);
        cellBg.fillRect(0, 0, 100, 100);
        cellBg.lineStyle(2, 0xff00ff, 0.8);
        cellBg.strokeRect(0, 0, 100, 100);
        cellBg.generateTexture("cellBg", 100, 100);
        cellBg.destroy();
    }
}

export default Preload;
