import * as React from "react";
import { EventBus } from "../hooks/events";

const Footer = ({ isTailwind = true }) => {
    React.useEffect(() => {}, []);

    return isTailwind ? (
        // Tailwind style
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between bg-gray-800/30 p-4 rounded-xl shadow-lg gap-2">
            {/* Info text */}
            <section className="flex justify-center sm:justify-start">
                <div className="text-sm sm:text-base md:text-lg text-white/80 text-center sm:text-left leading-snug">
                    Two players can play OX (also known as{" "}
                    <span className="font-bold text-white">Tic-Tac-Toe</span>).
                </div>
            </section>

            {/* Reset button */}
            <section className="flex justify-center sm:justify-end">
                <button
                    onClick={() => EventBus.emit("game:reset")}
                    className="w-12 h-12 flex items-center justify-center
                   rounded-full
                   bg-gradient-to-br from-red-500 to-red-700
                   text-white shadow-lg
                   hover:scale-110 hover:rotate-90 hover:shadow-xl
                   transition-transform duration-300 cursor-pointer"
                    aria-label="Reset Game"
                    title="Reset Game"
                >
                    <i className="fa fa-refresh text-lg"></i>
                </button>
            </section>
        </footer>
    ) : (
        // Bootstrap style
        <footer className="card-footer bg-gradient d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3 bg-secondary bg-opacity-40 p-3 rounded-3">
            {/* Info text */}
            <section className="text-center text-lg-start">
                <span className="text-white fs-6">
                    Two players can play OX (also known as <b>Tic-Tac-Toe</b>).
                </span>
            </section>

            {/* Reset button */}
            <section className="text-center text-lg-end">
                <button
                    className="btn btn-danger rounded-circle shadow-lg"
                    title="Reset Game"
                    onClick={() => EventBus.emit("game:reset")}
                    aria-label="Reset Game"
                >
                    <i className="fa fa-refresh"></i>
                </button>
            </section>
        </footer>
    );
};

export default Footer;
