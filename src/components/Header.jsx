import * as React from "react";
import { EventBus } from "../hooks/events";
import { FaGamepad } from "react-icons/fa";

const Header = ({ isTailwind, onLogout, player }) => {
    const [muted, setMuted] = React.useState(false);
    const [scores, setScores] = React.useState({ player: 0, bot: 0 });
    const [difficulty, setDifficulty] = React.useState("easy");

    React.useEffect(() => {
        const update = (data) => setScores({ ...data });
        EventBus.on("score:update", update);

        return () => EventBus.off("score:update", update);
    }, [scores]);

    const toggle = () => {
        const newMute = !muted;
        setMuted(newMute);
        EventBus.emit("sound:toggle", newMute);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setDifficulty(value);
        EventBus.emit("difficulty:change", value);
    };

    return isTailwind ? (
        // Tailwind style
        <header className="w-full flex flex-col sm:flex-row items-center justify-between bg-violet-800/30 p-4 rounded-xl shadow-lg gap-2">
            <section className="flex justify-center sm:justify-start gap-3 w-full sm:w-auto">
                <div className="flex capitalize items-center gap-2 bg-black/30 px-4 py-2 rounded-lg text-white font-semibold">
                    <i className="fa fa-user text-green-200"></i>
                    {player}:{" "}
                    <span className="text-cyan-400 text-lg">
                        {scores.player}
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg text-white font-semibold">
                    <i className="fa fa-robot text-pink-200"></i>
                    Bot:{" "}
                    <span className="text-cyan-400 text-lg">{scores.bot}</span>
                </div>
            </section>

            <section className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                {/* Difficulty Selector */}
                <div className="relative">
                    <FaGamepad className="absolute left-2 top-1/2 -translate-y-1/2 text-pink-300" />
                    <select
                        value={difficulty}
                        onChange={handleChange}
                        className="pl-8 pr-6 py-2 rounded-lg bg-indigo-900 text-white shadow-md border border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="relative flex flex-column">
                    <button
                        onClick={toggle}
                        className={`w-8 h-8 flex cursor-pointer items-center p-4 justify-center rounded-full ${
                            muted ? "bg-red-500" : "bg-green-600"
                        }  text-white shadow-lg hover:scale-110 hover:shadow-xl transition`}
                        title="Toggle sound on/off"
                        aria-label="Toggle sound"
                    >
                        <i
                            className={`fa ${
                                muted ? "fa-volume-mute" : "fa-volume-up"
                            }`}
                        ></i>
                    </button>
                    <button
                        onClick={onLogout}
                        title="Logout game"
                        aria-label="Logout game"
                        className="btn h-8 w-8 text-white ml-2 cursor-pointer bg-red-400 sm:mb-0 rounded-full"
                    >
                        <i className="fa fa-power-off"></i>
                    </button>
                </div>
            </section>
        </header>
    ) : (
        // Bootstrap style
        <header className="bg-primary bg-opacity-50 p-3 rounded-3">
            <div className="row align-items-center g-3">
                {/* Scores section */}
                <section className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-start gap-3">
                    <div className="bg-success text-white fs-6 py-2 rounded-3 px-3 d-flex align-items-center">
                        <i className="fa fa-user me-2"></i>{" "}
                        <span className="text-capitalize">{player}:</span>
                        <span className="ms-1 fw-bold">{scores.player}</span>
                    </div>

                    <div className="bg-danger text-white fs-6 py-2 rounded-3 px-3 d-flex align-items-center">
                        <i className="fa fa-robot me-2"></i> Bot:{" "}
                        <span className="ms-1 fw-bold">{scores.bot}</span>
                    </div>
                </section>

                {/* Controls section */}
                <section className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-end gap-3">
                    <select
                        className="form-select bg-secondary text-white w-auto rounded-3"
                        value={difficulty}
                        onChange={handleChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <button
                        onClick={toggle}
                        title="Toggle sound on/off"
                        aria-label="Toggle sound"
                        style={{ with: "2rem", height: "2rem" }}
                        className={`btn btn-sm rounded-circle shadow-sm ${
                            muted ? "btn-dark" : "btn-success"
                        }`}
                    >
                        <i
                            className={`fa ${
                                muted ? "fa-volume-mute" : "fa-volume-up"
                            }`}
                        ></i>
                    </button>
                    <button
                        onClick={onLogout}
                        title="Exit from game"
                        aria-label="Exit"
                        style={{ with: "2rem", height: "2rem" }}
                        className="btn btn-sm btn-danger rounded-circle"
                    >
                        <i className="fa fa-power-off"></i>
                    </button>
                </section>
            </div>
        </header>
    );
};

export default Header;
