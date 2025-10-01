import * as React from "react";
import StartGame from "../game/init";
import { EventBus } from "../hooks/events";

const PhaserGame = React.forwardRef(({ props }, ref) => {
    const game = React.useRef();

    React.useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame("game-container");

            if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        // Clean up Phaser when React unmounts
        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };
    }, [ref]);

    // Listen for scene ready
    React.useLayoutEffect(() => {
        const handleSceneReady = (scene) => {
            if (ref) {
                ref.current.scene = scene;
            }
        };
        EventBus.on("current-scene-ready", handleSceneReady);

        return () => EventBus.off("current-scene-ready", handleSceneReady);
    }, [ref]);

    return <div id="game-container" {...props}></div>;
});

export default PhaserGame;
