import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import {
    Search as SearchIcon,
    HomeRounded as HomeIcon,
} from "@mui/icons-material";

import { appName, logo } from "constants/app";
import { useAuth, useI18n } from "providers";
import useAppHeader from "./useAppHeader";

import LanguageSelector from "components/LanguageSelector";
import UserAvatar from "components/UserAvatar";

import styles from "./styles.module.scss";

function AppHeader() {
    const { user } = useAuth();
    const { translate } = useI18n();
    const {
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
    } = useAppHeader();

    return (
        <header
            className={styles.AppHeader}
            data-shadow={showShadow}
        >
            <div className={styles.AppHeaderLeft}>
                <div
                    className={styles.AppHeaderLogo}
                    onClick={handleGoToHome}
                >
                    <img
                        src={logo}
                        alt={translate("Logo")}
                    />
                </div>
                <span
                    className={styles.AppHeaderName}
                    onClick={handleGoToHome}
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
                {showCreateButton && (
                    <Button
                        variant="outlined"
                        onClick={handleGoToEditor}
                    >
                        {translate("Criar")}
                    </Button>
                )}

                <LanguageSelector />

                {showLoginButton && (
                    <Button
                        variant="outlined"
                        onClick={handleGoToLogin}
                    >
                        {translate("Entrar")}
                    </Button>
                )}
                {showRegisterButton && (
                    <Button
                        variant="outlined"
                        onClick={handleGoToRegister}
                    >
                        {translate("Cadastrar")}
                    </Button>
                )}
                {showHomeButton && (
                    <IconButton onClick={handleGoToHome}>
                        <HomeIcon />
                    </IconButton>
                )}
                {user && <UserAvatar user={user} />}
            </div>
        </header>
    );
}

export default AppHeader;
export { AppHeader };
