import { createContext, useState, useCallback } from "react";

const ToastContext = createContext();
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-1/6 justify-center items-center w-full flex flex-col">
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
            </div>
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider };
