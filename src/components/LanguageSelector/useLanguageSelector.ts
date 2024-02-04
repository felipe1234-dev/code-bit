import { useState } from "react";
import { LanguageKey } from "i18n";
import { useI18n } from "providers";

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

function useLanguageSelector() {
    const [langAnchorEl, setLangAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const { selectLanguage } = useI18n();
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
        selectLanguage(newLanguage);
        handleCloseLangOptions();
    };

    return {
        langAnchorEl,
        langOptionsOpen,
        handleOpenLangOptions,
        handleCloseLangOptions,
        handleChangeLanguage,
        menuProps,
    };
}

export default useLanguageSelector;
