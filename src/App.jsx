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

    // Load from Firebase when player logs in
    const handleAuth = async (name) => {
        setPlayer(name);
        localStorage.setItem("playerName", name);
        setLoading(false);
        setShowBanner(true);
    };

    React.useEffect(() => {
        const savedName = localStorage.getItem("playerName");
        if (savedName) {
            setPlayer(savedName);
        }
        setLoading(false);
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

    const handleLogout = () => {
        localStorage.removeItem("playerName");
        setPlayer(null);
    };

    if (!player) return <Auth onAuth={handleAuth} isTailwind={isTailwind} />;
    else if (showBanner)
        return (
            <Banner
                onClose={() => setShowBanner(false)}
                isTailwind={isTailwind}
            />
        );

    return (
        <React.Suspense fallback={loading && <div> Loading... </div>}>
            <Content
                player={player}
                onLogout={handleLogout}
                isTailwind={isTailwind}
            />
        </React.Suspense>
    );
};

export default App;
