import { botPerfect, botRandom, botWinOrBlock } from "./actions";
import { handleDraw, handleWin } from "./handlers";
import { checkWinner } from "./helpers";

const Contrllers = {
    // --- PLAYER MOVE ---
    makePlayerMove(scene, index) {
        if (scene.board[index] || scene.gameOver || scene.currentPlayer !== "O")
            return;

        makeMove(scene, index, "O"); // place O

        if (!scene.gameOver) {
            // let bot move after short delay
            scene.time.delayedCall(400, () => makeBotMove(scene));
        }
    },
    // --- BOT MOVE ---
    makeBotMove(scene) {
        if (scene.gameOver) return;

        switch (scene.difficulty) {
            case "easy":
                botRandom(scene);
                break;
            case "medium":
                botWinOrBlock(scene);
                break;
            case "hard":
                botPerfect(scene);
                break;
        }
    },
    // --- CORE MOVE LOGIC ---
    makeMove(scene, index, player) {
        if (scene.board[index] || scene.gameOver) return;

        scene.sound.play("click");
        scene.board[index] = player;
        const texture = player === "O" ? "neonO" : "neonX";

        const symbol = scene.add
            .image(scene.cells[index].x, scene.cells[index].y, texture)
            .setScale(0);

        scene.cells[index].symbol = symbol;

        scene.tweens.add({
            targets: symbol,
            scale: 1,
            duration: 200,
            ease: "Back.easeOut",
        });

        const winner = checkWinner(scene);
        if (winner) {
            handleWin(scene, winner);
        } else if (scene.board.every((c) => c !== null)) {
            handleDraw(scene);
        }
    },
};

export const { makePlayerMove, makeBotMove, makeMove } = Contrllers;
