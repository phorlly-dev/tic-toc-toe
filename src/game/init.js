import GameEngine from "./scenes/Game";
import * as Phaser from "phaser";
import Preload from "./scenes/Preload";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    width: 600,
    height: 600,
    // scale: {
    //     mode: Phaser.Scale.FIT, // auto scale to fit
    //     autoCenter: Phaser.Scale.CENTER_BOTH, // center horizontally + vertically
    //     width: 600, // base width
    //     height: 600, // base height
    // },
    scene: [Preload, GameEngine],
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
