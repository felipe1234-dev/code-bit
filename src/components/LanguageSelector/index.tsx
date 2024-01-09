import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
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

function LanguageSelector() {
    const [langAnchorEl, setLangAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const { user, logout } = useAuth();
    const { translate, ...i18n } = useI18n();
    const { navigate, currentRoute } = useNavigation();

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
        <>
            <IconButton onClick={handleOpenLangOptions}>
                <TranslateIcon />
            </IconButton>
            <Menu
                anchorEl={langAnchorEl}
                open={langOptionsOpen}
                onClose={handleCloseLangOptions}
                slotProps={{
                    paper: { className: styles.LanguageSelectorMenu },
                }}
                {...menuProps}
            >
                {languageKeys.map((language) => {
                    const [, code] = language.split("_");
                    return (
                        <MenuItem
                            key={language}
                            className={styles.LanguageSelectorOption}
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
        </>
    );
}

export default LanguageSelector;
export { LanguageSelector };
