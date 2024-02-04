import { IconButton, Menu, MenuItem } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";

import { languageKeys } from "i18n";
import { useI18n } from "providers";
import useLanguageSelector from "./useLanguageSelector";

import styles from "./styles.module.scss";

function LanguageSelector() {
    const {
        langAnchorEl,
        langOptionsOpen,
        handleOpenLangOptions,
        handleCloseLangOptions,
        handleChangeLanguage,
        menuProps,
    } = useLanguageSelector();
    const { selectedLanguage, translate } = useI18n();

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
                            disabled={language === selectedLanguage}
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
