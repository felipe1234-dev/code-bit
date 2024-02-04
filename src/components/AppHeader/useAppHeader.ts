import { useState, useEffect } from "react";
import { useAuth, useNavigation } from "providers";

function useAppHeader() {
    const [searchEl, setSearchEl] = useState<HTMLDivElement | null>(null);
    const { user } = useAuth();
    const { currentRoute, navigate } = useNavigation();

    const showCreateButton = user?.uid && currentRoute?.key !== "editor";
    const showLoginButton = !user?.uid && currentRoute?.key !== "login";
    const showRegisterButton = !user?.uid && currentRoute?.key !== "register";
    const showHomeButton = !["challenges", "home"].includes(
        currentRoute?.key || ""
    );
    const showShadow = !currentRoute?.hideHeaderShadow;

    const handleGoToHome = () => navigate("/");
    const handleGoToEditor = () => navigate("/editor");
    const handleGoToLogin = () => navigate("/login");
    const handleGoToRegister = () => navigate("/register");

    useEffect(() => {
        if (!searchEl) return;

        const input = searchEl.querySelector("input");
        if (!input) return;

        window.addEventListener("keydown", (evt) => {
            if (evt.ctrlKey && evt.key === "/") {
                input.focus();
            }
        });
    }, [searchEl]);

    return {
        searchEl,
        setSearchEl,
        showCreateButton,
        showLoginButton,
        showRegisterButton,
        showHomeButton,
        showShadow,
        handleGoToHome,
        handleGoToEditor,
        handleGoToLogin,
        handleGoToRegister,
    };
}

export default useAppHeader;
