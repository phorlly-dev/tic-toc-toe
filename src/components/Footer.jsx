import gameEvents from "../game/utils/events";

const Footer = () => {
    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-gray-800/30 p-4 rounded-xl shadow-lg gap-3">
            {/* Info text */}
            <div className="text-sm sm:text-base md:text-lg text-white/80 text-center sm:text-left leading-snug">
                Two players can play OX (also known as{" "}
                <span className="font-bold text-white">Tic-Tac-Toe</span>).
            </div>

            {/* Reset button */}
            <button
                onClick={() => gameEvents.emit("game:reset")}
                className="w-12 h-12 flex items-center justify-center 
                   rounded-full 
                   bg-gradient-to-br from-red-500 to-red-700 
                   text-white shadow-lg 
                   hover:scale-110 hover:rotate-90 hover:shadow-xl 
                   transition-transform duration-300"
                aria-label="Reset Game"
            >
                <i className="fa fa-refresh text-lg"></i>
            </button>
        </div>
    );
};

export default Footer;
