import { EventBus } from "../../hooks/events";
import { resetBoard } from "./helpers";
import { animateWinningLine } from "./objects";

const Handlers = {
    handleWin(scene, winner) {
        scene.gameOver = true;

        if (winner === "O") {
            scene.scores.player += 3;
            scene.sound.play("win");
        } else {
            scene.scores.bot += 3;
            scene.sound.play("lose");
        }

        // 🔔 Notify React/UI
        EventBus.emit("game:over", { winner });
        EventBus.emit("score:update", { ...scene.scores });

        // Highlight winning line
        animateWinningLine(scene);

        // Particle explosion
        const { width, height } = scene.scale;
        scene.winParticles.setPosition(width / 2, height / 2);
        scene.winParticles.start();

        // Screen flash
        const flash = scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0xffffff,
            0.3
        );
        scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 600,
            onComplete: () => flash.destroy(),
        });

        // Shake effect on losing symbols
        scene.cells.forEach((cell, i) => {
            if (
                scene.board[i] &&
                !scene.winningLine.includes(i) &&
                cell.symbol
            ) {
                scene.tweens.add({
                    targets: cell.symbol,
                    x: cell.symbol.x + Phaser.Math.Between(-5, 5),
                    y: cell.symbol.y + Phaser.Math.Between(-5, 5),
                    yoyo: true,
                    repeat: 5,
                    duration: 50,
                });
            }
        });

        // Auto reset after 3 seconds
        scene.time.delayedCall(3000, () => resetBoard(scene));
    },
    handleDraw(scene) {
        scene.gameOver = true;
        scene.sound.play("draw");

        // ✅ Both get +1 point
        scene.scores.player++;
        scene.scores.bot++;

        // 🔔 Notify React/UI
        EventBus.emit("game:over", { winner: "draw" });
        EventBus.emit("score:update", { ...scene.scores });

        // Pulse all cells for draw effect
        scene.cells.forEach((cell) => {
            scene.tweens.add({
                targets: cell.background,
                alpha: { from: 1, to: 0.3 },
                duration: 200,
                yoyo: true,
                repeat: 3,
            });
        });

        scene.time.delayedCall(2000, () => resetBoard(scene));
    },
};

export const { handleWin, handleDraw } = Handlers;
