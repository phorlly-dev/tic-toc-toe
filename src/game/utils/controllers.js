import Actions from "./actions";
import Handlers from "./handlers";
import Helpers from "./helpers";

const Contrllers = {
    // --- PLAYER MOVE ---
    makePlayerMove(scene, index) {
        if (scene.board[index] || scene.gameOver || scene.currentPlayer !== "O")
            return;

        this.makeMove(scene, index, "O"); // place O

        if (!scene.gameOver) {
            // let bot move after short delay
            scene.time.delayedCall(400, () => this.makeBotMove(scene));
        }
    },
    // --- BOT MOVE ---
    makeBotMove(scene) {
        if (scene.gameOver) return;

        switch (scene.difficulty) {
            case "easy":
                Actions.botRandom(scene);
                break;
            case "medium":
                Actions.botWinOrBlock(scene);
                break;
            case "hard":
                Actions.botPerfect(scene);
                break;
        }
    },
    // --- CORE MOVE LOGIC ---
    makeMove(scene, index, player) {
        if (scene.board[index] || scene.gameOver) return;

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

        const winner = Helpers.checkWinner(scene);
        if (winner) {
            Handlers.handleWin(scene, winner);
        } else if (scene.board.every((c) => c !== null)) {
            Handlers.handleDraw(scene);
        }
    },
};

export default Contrllers;
