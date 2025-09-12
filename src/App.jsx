import * as React from "react";
import PhaserGame from "./components/PhaserGame";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { EventBus } from "./hooks/events";
import { useToast } from "./hooks/toast";
import { isLoaded } from "./hooks/load";

const App = () => {
    const phaserRef = React.useRef();
    const { showToast } = useToast();
    const [isTailwind, setIsTailwind] = React.useState(false);

    React.useEffect(() => setIsTailwind(isLoaded()), []);
    React.useEffect(() => {
        const handleGameOver = ({ winner }) => {
            switch (winner) {
                case "O":
                    showToast("🎉 You Wins!", "success");
                    break;

                case "X":
                    showToast("🤖 Bot Wins!", "error");
                    break;

                default:
                    showToast("🤝 It's a draw!", "info");
                    break;
            }
        };

        EventBus.on("game:over", handleGameOver);

        return () => EventBus.off("game:over", handleGameOver);
    }, [showToast]);

    return (
        <div className="flex">
            {isTailwind ? (
                //  Tailwind style
                <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 p-2">
                    {/* Container Card */}
                    <div className="w-full max-w-xl flex flex-col gap-3 bg-white/60 p-6 rounded-2xl shadow-lg">
                        {/* HEADER */}
                        <Header />

                        {/* GAME BOARD */}
                        <main className="flex-1 flex items-center justify-center">
                            <section className="w-full max-w-[600px] aspect-square rounded-xl overflow-hidden shadow-2xl">
                                <PhaserGame ref={phaserRef} />
                            </section>
                        </main>

                        {/* FOOTER */}
                        <Footer />
                    </div>
                </div>
            ) : (
                // Bootstrap style
                <div className="min-vh-100 d-flex justify-content-center align-items-center p-2">
                    <div
                        className="card rounded-4 p-3 m-auto"
                        style={{ maxWidth: "600px", width: "100%" }}
                    >
                        {/* Header */}
                        <Header isTailwind={false} />

                        {/* Game Board */}
                        <main className="card-body border ratio ratio-1x1 mb-2 mt-2 rounded-4 shadow-lg">
                            <section className="justify-content-center align-items-center d-flex flex-col ">
                                <PhaserGame ref={phaserRef} />
                            </section>
                        </main>

                        {/* Footer */}
                        <Footer isTailwind={false} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
