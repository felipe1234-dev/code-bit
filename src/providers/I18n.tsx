import React, { createContext, useContext, useState } from "react";
import i18n, {
    allLanguages,
    getCurrentLanguage,
    changeLanguage,
    LanguageKey,
    ReplaceMatrix,
    LanguageTable,
} from "i18n";

interface I18nValue {
    selectedLanguage: LanguageKey;
    selectLanguage: (language: LanguageKey) => void;
    table: LanguageTable;
    translate: (texT: string, replaceMatrix?: ReplaceMatrix) => string;
}

const I18nContext = createContext<I18nValue | undefined>(undefined);

function I18nProvider(props: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>(
        getCurrentLanguage().language
    );

    const translate = (text: string, replaceMatrix?: ReplaceMatrix) =>
        i18n(text, replaceMatrix);

    const selectLanguage = (newLanguage: LanguageKey) => {
        changeLanguage(newLanguage);
        setCurrentLanguage(newLanguage);
    };

    const table = allLanguages[currentLanguage];

    return (
        <I18nContext.Provider
            value={{
                selectedLanguage: currentLanguage,
                selectLanguage,
                translate,
                table,
            }}
        >
            {props.children}
        </I18nContext.Provider>
    );
}

function useI18n() {
    const context = useContext(I18nContext);
    if (!context)
        throw new Error("useI18n must be used within an I18nProvider");
    return context;
}

export { I18nContext, I18nProvider, useI18n };
