import { useEffect, useRef } from "react";
import PhaserGame from "../components/PhaserGame";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EventBus } from "../hooks/events";
import { useToast } from "../hooks/toast";

const App = () => {
    const phaserRef = useRef();
    const { showToast } = useToast();

    useEffect(() => {
        const handleGameOver = ({ winner }) => {
            if (winner === "draw") {
                showToast("🤝 It's a draw!", "warning");
            } else if (winner === "O") {
                showToast("🎉 You Wins!", "success");
            } else if (winner === "X") {
                showToast("🤖 Bot Wins!", "error");
            }
        };

        EventBus.on("game:over", handleGameOver);

        return () => EventBus.off("game:over", handleGameOver);
    }, [showToast]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 p-2">
            {/* Container Card */}
            <div className="w-full max-w-xl flex flex-col gap-3 bg-white/40 p-6 rounded-2xl shadow-lg">
                {/* HEADER */}
                <Header />

                {/* GAME BOARD */}
                <div className="flex-1 flex items-center justify-center">
                    <div
                        id="phaser-parent"
                        className="w-full max-w-[600px] aspect-square rounded-xl overflow-hidden shadow-2xl"
                    >
                        <PhaserGame ref={phaserRef} />
                    </div>
                </div>

                {/* FOOTER */}
                <Footer />
            </div>
        </div>
    );
};

export default App;
