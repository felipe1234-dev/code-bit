import { useState } from "react";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";

import { languageKeys, LanguageKey } from "i18n";
import { useAuth, useI18n, useNavigation } from "providers";

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

    const { user } = useAuth();
    const { translate, ...i18n } = useI18n();
    const { navigate } = useNavigation();

    const langOptionsOpen = Boolean(langAnchorEl);

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
                <IconButton onClick={handleOpenLangOptions}>
                    <TranslateIcon />
                </IconButton>

                {!user?.uid && (
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
        </header>
    );
}

export default AppHeader;
export { AppHeader };
