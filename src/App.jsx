import * as React from "react";
import { EventBus } from "./hooks/events";
import { useToast } from "./hooks/toast";
import { isLoaded } from "./hooks/load";
import Auth from "./components/Auth";

const Content = React.lazy(() => import("./components/Content"));
const Banner = React.lazy(() => import("./components/Banner"));
const App = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = React.useState(true);
    const [player, setPlayer] = React.useState(null);
    const [showBanner, setShowBanner] = React.useState(true);
    const [isTailwind, setIsTailwind] = React.useState(false);

    React.useEffect(() => {
        const savedName = localStorage.getItem("playerName");
        if (savedName) {
            setPlayer(savedName);
        }
        setLoading(true);
        setIsTailwind(isLoaded());
        setShowBanner(true);
    }, []);

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

    if (!player) {
        return (
            <Auth
                onAuth={(name) => {
                    setPlayer(name);
                    localStorage.setItem("playerName", name);
                    setLoading(true);
                    setShowBanner(true);
                }}
                isTailwind={isTailwind}
            />
        );
    } else if (showBanner) {
        return (
            <Banner
                isTailwind={isTailwind}
                onClose={() => {
                    setShowBanner(false);
                    setLoading(false);
                }}
            />
        );
    } else {
        return (
            <React.Suspense fallback={loading && <div> Loading... </div>}>
                <Content
                    player={player}
                    isTailwind={isTailwind}
                    onLogout={() => {
                        localStorage.removeItem("playerName");
                        setPlayer(null);
                        setShowBanner(true);
                        setLoading(true);
                    }}
                />
            </React.Suspense>
        );
    }
};

export default App;
