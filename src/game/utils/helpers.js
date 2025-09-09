import gameEvents from "./events";

const Helpers = {
    checkWinner(scene) {
        const patterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const [a, b, c] of patterns) {
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
        gameEvents.emit("score:update", scene.scores);
    },
};

export default Helpers;
