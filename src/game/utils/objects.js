import Contrllers from "./controllers";

const Objects = {
    createBoard(scene) {
        for (let i = 0; i < 9; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = scene.startX + col * scene.cellSize;
            const y = scene.startY + row * scene.cellSize;

            const cell = scene.add
                .image(x, y, "cellBg")
                .setOrigin(0, 0)
                .setDisplaySize(scene.cellSize, scene.cellSize)
                .setInteractive()
                .on("pointerup", () => Contrllers.makePlayerMove(scene, i)) // ✅ only one definition
                .on("pointerover", () => {
                    if (!scene.board[i] && !scene.gameOver) {
                        cell.setTint(0x6600cc);
                    }
                })
                .on("pointerout", () => cell.clearTint());

            scene.cells.push({
                background: cell,
                symbol: null,
                x: x + scene.cellSize / 2,
                y: y + scene.cellSize / 2,
            });
        }
    },
    createParticles(scene) {
        scene.winParticles = scene.add.particles(0, 0, "neonX", {
            speed: { min: 100, max: 200 },
            scale: { start: 0.3, end: 0 },
            blendMode: "ADD",
            emitting: false,
        });
    },
    animateWinningLine(scene) {
        if (!scene.winningLine) return;

        const startCell = scene.cells[scene.winningLine[0]];
        const endCell = scene.cells[scene.winningLine[2]];

        const graphics = scene.add.graphics();
        graphics.lineStyle(8, 0xffff00, 0.9);
        graphics.moveTo(startCell.x, startCell.y);
        graphics.lineTo(endCell.x, endCell.y);
        graphics.stroke();

        // Glow pulse
        scene.tweens.add({
            targets: graphics,
            alpha: { from: 1, to: 0.3 },
            duration: 300,
            yoyo: true,
            repeat: 6,
            onComplete: () => graphics.destroy(),
        });
    },
};

export default Objects;
