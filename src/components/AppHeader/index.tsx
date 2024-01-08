import { useState, useMemo } from "react";
import { IconButton, Button, Menu, MenuItem, Avatar } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";

import { languageKeys, LanguageKey } from "i18n";
import { useAuth, useI18n, useLoader, useNavigation } from "providers";
import { getNameInitials } from "utils/functions";

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
    const [langAnchorEl, setLangAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );
    const [userAnchorEl, setUserAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const { user, logout } = useAuth();
    const { translate, ...i18n } = useI18n();
    const { navigate } = useNavigation();
    const loader = useLoader();

    const langOptionsOpen = Boolean(langAnchorEl);
    const userMenuOpen = Boolean(userAnchorEl);

    const handleOpenLangOptions = (
        evt: React.MouseEvent<HTMLButtonElement>
    ) => {
        setLangAnchorEl(evt.currentTarget);
    };

    const handleCloseLangOptions = () => {
        setLangAnchorEl(null);
    };

    const handleChangeLanguage = (newLanguage: LanguageKey) => () => {
        i18n.selectLanguage(newLanguage);
        handleCloseLangOptions();
    };

    const handleOpenUserMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setUserAnchorEl(evt.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserAnchorEl(null);
    };

    const handleLogout = async () => {
        loader.show();

        try {
            handleCloseUserMenu();
            await logout();
            navigate("/");
        } finally {
            loader.hide();
        }
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const nameInitials = useMemo(() => {
        if (!user) return "";
        return getNameInitials(user.fullName);
    }, [user]);

    return (
        <header className={styles.AppHeader}>
            <div className={styles.AppHeaderLeft}>
                <a
                    href="javacript:void(0)"
                    onClick={() => navigate("/")}
                >
                    <span>{"<"}</span>
                    <code>Code</code>
                    <span>{" />"}</span>Bit
                </a>
            </div>
            <div className={styles.AppHeaderRight}>
                {user?.uid && (
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/editor")}
                    >
                        {translate("Criar")}
                    </Button>
                )}

                <IconButton onClick={handleOpenLangOptions}>
                    <TranslateIcon />
                </IconButton>

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
                    <IconButton
                        className={styles.AppHeaderUserPhotoButton}
                        onClick={handleOpenUserMenu}
                    >
                        <Avatar
                            src={user.photo}
                            alt={user.fullName}
                        >
                            {nameInitials}
                        </Avatar>
                    </IconButton>
                )}
            </div>

            <Menu
                anchorEl={langAnchorEl}
                open={langOptionsOpen}
                onClose={handleCloseLangOptions}
                slotProps={{
                    paper: { className: styles.AppHeaderLanguages },
                }}
                {...menuProps}
            >
                {languageKeys.map((language) => {
                    const [, code] = language.split("_");
                    return (
                        <MenuItem
                            key={language}
                            className={styles.AppHeaderOption}
                            onClick={handleChangeLanguage(language)}
                            disabled={language === i18n.selectedLanguage}
                        >
                            <img
                                loading="lazy"
                                srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                                alt={translate(language)}
                            />
                            <span>{translate(language)}</span>
                        </MenuItem>
                    );
                })}
            </Menu>

            <Menu
                anchorEl={userAnchorEl}
                open={userMenuOpen}
                onClose={handleCloseUserMenu}
                PaperProps={{
                    className: styles.AppHeaderUserMenu,
                }}
                {...menuProps}
            >
                <MenuItem onClick={handleProfile}>
                    {translate("Seu perfil")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    {translate("Sair da conta")}
                </MenuItem>
            </Menu>
        </header>
    );
}

export default AppHeader;
export { AppHeader };
