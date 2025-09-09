import { useEffect, useState } from "react";
import gameEvents from "../game/utils/events";

const Header = () => {
    const [muted, setMuted] = useState(false);
    const [scores, setScores] = useState({ player: 0, bot: 0 });

    useEffect(() => {
        const update = (data) => setScores({ ...data });
        gameEvents.on("score:update", update);

        return () => {
            gameEvents.off("score:update", update);
        };
    }, []);

    const toggle = () => {
        const newMute = !muted;
        setMuted(newMute);
        gameEvents.emit("sound:toggle", newMute);
    };

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-violet-800/30 p-4 rounded-xl shadow-lg gap-2">
            <div className="flex justify-center sm:justify-start gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg text-white font-semibold">
                    <i className="fa fa-user text-green-400"></i>
                    Player:{" "}
                    <span id="player-score" className="text-cyan-400 text-lg">
                        {scores.player}
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg text-white font-semibold">
                    <i className="fa fa-robot text-pink-400"></i>
                    Bot:{" "}
                    <span id="bot-score" className="text-cyan-400 text-lg">
                        {scores.bot}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <button
                    onClick={toggle}
                    className={`w-10 h-10 flex cursor-pointer items-center p-4 justify-center rounded-full ${
                        muted ? "bg-red-500" : "bg-green-600"
                    }  text-white shadow-lg hover:scale-110 hover:shadow-xl transition`}
                >
                    <i
                        className={`fa ${
                            muted ? "fa-volume-mute" : "fa-volume-up"
                        }`}
                    ></i>
                </button>
            </div>
        </div>
    );
};

export default Header;
