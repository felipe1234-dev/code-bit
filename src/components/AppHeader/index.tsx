import { useState, useEffect } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { appName } from "constants/app";
import { useAuth, useI18n, useNavigation } from "providers";
import logo from "assets/images/logo.svg";

import LanguageSelector from "components/LanguageSelector";
import UserAvatar from "components/UserAvatar";

import styles from "./styles.module.scss";

function AppHeader() {
    const [searchEl, setSearchEl] = useState<HTMLDivElement | null>(null);
    const { user } = useAuth();
    const { translate } = useI18n();
    const { navigate, currentRoute } = useNavigation();

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

    return (
        <header className={styles.AppHeader}>
            <div className={styles.AppHeaderLeft}>
                <div
                    className={styles.AppHeaderLogo}
                    onClick={() => navigate("/")}
                >
                    <img
                        src={logo}
                        alt={translate("Logo")}
                    />
                </div>
                <span
                    className={styles.AppHeaderName}
                    onClick={() => navigate("/")}
                >
                    {appName}
                </span>
                <TextField
                    ref={setSearchEl}
                    className={styles.AppHeaderSearch}
                    variant="filled"
                    placeholder={translate("Pesquisa rápida (Ctrl + /)")}
                    InputProps={{
                        className: styles.AppHeaderSearchInput,
                        startAdornment: (
                            <InputAdornment
                                className={styles.AppHeaderSearchIcon}
                                position="start"
                            >
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={styles.AppHeaderRight}>
                {user?.uid && currentRoute?.key !== "editor" && (
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/editor")}
                    >
                        {translate("Criar")}
                    </Button>
                )}

                <LanguageSelector />

                {!user?.uid ? (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/login")}
                        >
                            {translate("Entrar")}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/register")}
                        >
                            {translate("Cadastrar")}
                        </Button>
                    </>
                ) : (
                    <UserAvatar />
                )}
            </div>
        </header>
    );
}

export default AppHeader;
export { AppHeader };
