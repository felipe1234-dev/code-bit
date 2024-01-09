import { Button } from "@mui/material";

import { useAuth, useI18n, useNavigation } from "providers";
import logo from "assets/images/logo.svg";

import LanguageSelector from "components/LanguageSelector";
import UserAvatar from "components/UserAvatar";

import styles from "./styles.module.scss";

const menuProps = {
    anchorOrigin: {
        vertical: "bottom" as "bottom",
        horizontal: "left" as "left",
    },
    transformOrigin: {
        vertical: "top" as "top",
        horizontal: "left" as "left",
    },
};

function AppHeader() {
    const { user } = useAuth();
    const { translate } = useI18n();
    const { navigate, currentRoute } = useNavigation();

    return (
        <header className={styles.AppHeader}>
            <div className={styles.AppHeaderLeft}>
                {user?.uid && (
                    <div
                        className={styles.AppHeaderLogo}
                        onClick={() => navigate("/")}
                    >
                        <img
                            src={logo}
                            alt={translate("Logo")}
                        />
                    </div>
                )}
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
