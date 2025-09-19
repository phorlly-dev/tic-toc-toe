import * as React from "react";
import { isLoaded } from "../hooks/load";

const ToastContext = React.createContext();
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = React.useState([]);
    const [isTailwind, setIsTailwind] = React.useState(false);

    React.useEffect(() => setIsTailwind(isLoaded()), []);

    const showToast = React.useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return isTailwind ? (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <section className="fixed top-1/6 justify-center items-center w-full flex flex-col">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-2 rounded-lg shadow-lg text-white animate-slide-up
              ${toast.type === "success" ? "bg-green-600" : ""}
              ${toast.type === "error" ? "bg-red-600" : ""}
              ${toast.type === "warning" ? "bg-yellow-500 text-black" : ""}
              ${toast.type === "info" ? "bg-indigo-600" : ""}
            `}
                    >
                        {toast.message}
                    </div>
                ))}
            </section>
        </ToastContext.Provider>
    ) : (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="position-fixed top-50 start-50 translate-middle-x mt-4 rounded-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast align-items-center text-white border-0 mb-2 show
              ${toast.type === "success" ? "bg-success" : ""}
              ${toast.type === "error" ? "bg-danger" : ""}
              ${toast.type === "warning" ? "bg-warning text-dark" : ""}
              ${toast.type === "info" ? "bg-primary" : ""}`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        style={{ width: "150px" }}
                    >
                        <div className="d-flex px-3 py-2">
                            <div className="toast-body">{toast.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider };
