import { EventBus } from "../../hooks/events";

const Helpers = {
    checkWinner(scene) {
        for (const [a, b, c] of this.winningPatterns()) {
            if (
                scene.board[a] &&
                scene.board[a] === scene.board[b] &&
                scene.board[a] === scene.board[c]
            ) {
                scene.winningLine = [a, b, c];

                return scene.board[a];
            }
        }

        return null;
    },
    resizeBoard(scene, width, height) {
        const size = Math.min(width, height) * 0.9; // 90% of container
        const cellSize = size / 3;
        const startX = (width - size) / 2;
        const startY = (height - size) / 2;

        scene.cells.forEach((cell, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = startX + col * cellSize;
            const y = startY + row * cellSize;

            cell.background
                .setPosition(x, y)
                .setDisplaySize(cellSize, cellSize);
            if (cell.symbol) {
                cell.symbol.setPosition(x + cellSize / 2, y + cellSize / 2);
            }

            cell.x = x + cellSize / 2;
            cell.y = y + cellSize / 2;
        });
    },
    resetBoard(scene) {
        scene.board.fill(null);
        scene.gameOver = false;
        scene.currentPlayer = "O";
        scene.winningLine = null;

        scene.cells.forEach((cell) => {
            if (cell.symbol) {
                cell.symbol.destroy();
                cell.symbol = null;
            }
        });

        scene.winParticles.stop();
    },
    resetGame(scene) {
        scene.scores = { player: 0, bot: 0 };
        this.resetBoard(scene);
        EventBus.emit("score:update", { ...scene.scores });
    },
    getEmptyCells(scene) {
        return scene.board
            .map((val, idx) => (val === null ? idx : null))
            .filter((val) => val !== null);
    },
    winningPatterns() {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    },
    minimax(scene, board, depth, isMaximizing) {
        const winner = this.checkWinner(scene);
        if (winner === "X") return 10 - depth;
        if (winner === "O") return depth - 10;
        if (board.every((c) => c !== null)) return 0;

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "X";
                    best = Math.max(
                        best,
                        this.minimax(scene, board, depth + 1, false)
                    );
                    board[i] = null;
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "O";
                    best = Math.min(
                        best,
                        this.minimax(scene, board, depth + 1, true)
                    );
                    board[i] = null;
                }
            }
            return best;
        }
    },
};

export default Helpers;
