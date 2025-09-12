export const CheckLoaded = () => {
    const element = document.createElement("div");
    element.className = "flex"; // Tailwind always includes flex
    document.body.appendChild(element);

    const isFlex = window.getComputedStyle(element).display === "flex";
    document.body.removeChild(element);

    if (!isFlex) {
        console.warn("⚠️ Tailwind not detected, switching to Bootstrap...");
        document.getElementById("bootstrap").disabled = false;
    }

    return isFlex;
};
