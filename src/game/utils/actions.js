import { makeMove } from "./controllers";
import { getEmptyCells, minimax, winningPatterns } from "./helpers";

const Actions = {
    // --- EASY ---
    botRandom(scene) {
        const emptyCells = getEmptyCells(scene);
        const choice = Phaser.Utils.Array.GetRandom(emptyCells);
        if (choice !== undefined) return makeMove(scene, choice, "X");
    },
    // --- MEDIUM (Win-or-Block) ---
    botWinOrBlock(scene) {
        const emptyCells = getEmptyCells(scene);
        if (emptyCells.length === 0) return;

        // Try win
        for (const [a, b, c] of winningPatterns()) {
            if (
                scene.board[a] === "X" &&
                scene.board[b] === "X" &&
                scene.board[c] === null
            )
                return makeMove(scene, c, "X");
            else if (
                scene.board[a] === "X" &&
                scene.board[c] === "X" &&
                scene.board[b] === null
            )
                return makeMove(scene, b, "X");
            else if (
                scene.board[b] === "X" &&
                scene.board[c] === "X" &&
                scene.board[a] === null
            )
                return makeMove(scene, a, "X");
        }
        // Block player
        for (const [x, y, z] of winningPatterns()) {
            if (
                scene.board[x] === "O" &&
                scene.board[y] === "O" &&
                scene.board[z] === null
            )
                return makeMove(scene, z, "X");
            else if (
                scene.board[x] === "O" &&
                scene.board[z] === "O" &&
                scene.board[y] === null
            )
                return makeMove(scene, y, "X");
            else if (
                scene.board[y] === "O" &&
                scene.board[z] === "O" &&
                scene.board[x] === null
            )
                return makeMove(scene, x, "X");
        }

        // Else random
        return botRandom(scene);
    },
    // --- HARD (Perfect Minimax) ---
    botPerfect(scene) {
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < 9; i++) {
            if (scene.board[i] === null) {
                scene.board[i] = "X";
                let score = minimax(scene, scene.board, 0, false);
                scene.board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        if (move !== undefined) return makeMove(scene, move, "X");
    },
};

export const { botRandom, botWinOrBlock, botPerfect } = Actions;
