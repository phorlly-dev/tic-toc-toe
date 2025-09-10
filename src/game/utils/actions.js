import Contrllers from "./controllers";
import Helpers from "./helpers";

const Actions = {
    // --- EASY ---
    botRandom(scene) {
        const emptyCells = Helpers.getEmptyCells(scene);
        const choice = Phaser.Utils.Array.GetRandom(emptyCells);
        if (choice !== undefined) Contrllers.makeMove(scene, choice, "X");
    },
    // --- MEDIUM (Win-or-Block) ---
    botWinOrBlock(scene) {
        const emptyCells = Helpers.getEmptyCells(scene);
        if (emptyCells.length === 0) return;

        // Try win
        for (let [a, b, c] of Helpers.winningPatterns()) {
            if (
                scene.board[a] === "X" &&
                scene.board[b] === "X" &&
                scene.board[c] === null
            )
                return Contrllers.makeMove(scene, c, "X");
            else if (
                scene.board[a] === "X" &&
                scene.board[c] === "X" &&
                scene.board[b] === null
            )
                return Contrllers.makeMove(scene, b, "X");
            else if (
                scene.board[b] === "X" &&
                scene.board[c] === "X" &&
                scene.board[a] === null
            )
                return Contrllers.makeMove(scene, a, "X");
        }

        // Block player
        for (let [a, b, c] of Helpers.winningPatterns()) {
            if (
                scene.board[a] === "O" &&
                scene.board[b] === "O" &&
                scene.board[c] === null
            )
                return Contrllers.makeMove(scene, c, "X");
            else if (
                scene.board[a] === "O" &&
                scene.board[c] === "O" &&
                scene.board[b] === null
            )
                return Contrllers.makeMove(scene, b, "X");
            else if (
                scene.board[b] === "O" &&
                scene.board[c] === "O" &&
                scene.board[a] === null
            )
                return Contrllers.makeMove(scene, a, "X");
        }

        // Else random
        this.botRandom(scene);
    },
    // --- HARD (Perfect Minimax) ---
    botPerfect(scene) {
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < 9; i++) {
            if (scene.board[i] === null) {
                scene.board[i] = "X";
                let score = Helpers.minimax(scene, scene.board, 0, false);
                scene.board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        if (move !== undefined) Contrllers.makeMove(scene, move, "X");
    },
};

export default Actions;
