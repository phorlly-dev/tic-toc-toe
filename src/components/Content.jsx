import * as React from "react";

// Lazy load the Phaser game
const PhaserGame = React.lazy(() => import("./PhaserGame"));
const Header = React.lazy(() => import("./Header"));
const Footer = React.lazy(() => import("./Footer"));
const Content = ({ isTailwind, player, onLogout }) => {
    const phaserRef = React.useRef();

    return (
        <div className="flex">
            {isTailwind ? (
                //  Tailwind style
                <div className="min-h-screen w-full flex flex-col items-center justify-center p-2">
                    {/* Container Card */}
                    <div className="w-full max-w-xl flex flex-col gap-3 bg-white/60 p-6 rounded-2xl shadow-lg">
                        {/* HEADER */}
                        <Header
                            onLogout={onLogout}
                            player={player}
                            isTailwind={isTailwind}
                        />

                        {/* GAME BOARD */}
                        <main className="flex-1 flex items-center justify-center">
                            <section className="w-full max-w-[600px] aspect-square rounded-xl overflow-hidden shadow-2xl">
                                <PhaserGame ref={phaserRef} />
                            </section>
                        </main>

                        {/* FOOTER */}
                        <Footer isTailwind={isTailwind} />
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
                        <Header
                            onLogout={onLogout}
                            player={player}
                            isTailwind={isTailwind}
                        />

                        {/* Game Board */}
                        <main className="border ratio ratio-1x1 mb-2 mt-2 rounded-4 shadow-lg">
                            <PhaserGame ref={phaserRef} />
                        </main>

                        {/* Footer */}
                        <Footer isTailwind={isTailwind} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Content;
