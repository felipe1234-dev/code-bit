import pt_BR from "./pt_BR";
import pt_PT from "./pt_PT";
import en_US from "./en_US";

// import IntlPolyfill from "intl";
// IntlPolyfill.__disableRegExpRestore();
// import "intl/locale-data/jsonp/pt-BR.js";
const IntlPolyfill = Intl;

const allLanguages = {
    pt_BR,
    pt_PT,
    en_US,
};

const normalizeTranslate = {
    pt_BR: "pt_BR" as "pt_BR",
    "pt-BR": "pt_BR" as "pt_BR",
    pt_PT: "pt_PT" as "pt_PT",
    "pt-PT": "pt_PT" as "pt_PT",
    pt: "pt_BR" as "pt_BR",
    en_US: "en_US" as "en_US",
    "en-US": "en_US" as "en_US",
    en: "en_US" as "en_US",
};

const languageKeys = Object.keys(allLanguages) as LanguageKey[];

type LanguageCode = keyof typeof normalizeTranslate;
type LanguageKey = keyof typeof allLanguages;
type LanguageTable = {
    default: {
        currency: {
            abbreviation: string;
            symbol: string;
            separator: string;
            delimiter: string;
        };
        date: {
            day: string;
            month: string;
            year: string;
        };
        datetime: {
            day: string;
            month: string;
            year: string;
            hour: string;
            minute: string;
            second: string;
        };
    };
    [key: string]: string | object;
};
type ReplaceMatrix = { [key: string]: string | number } | (string | number)[];

let language: LanguageKey;
let current: LanguageTable;

const getLanguageByDevice = (): LanguageKey => {
    const preSelected = localStorage.getItem("language") as LanguageKey;
    if (preSelected) return preSelected;

    localStorage.setItem(
        "language",
        Intl.NumberFormat().resolvedOptions().locale
    );

    return new Intl.NumberFormat().resolvedOptions().locale as LanguageKey;
};

const changeLanguage = (newLanguage?: LanguageKey) => {
    language = newLanguage || normalizeTranslate[getLanguageByDevice()];
    current = allLanguages[language];

    if (!language || !current) {
        language = "pt_BR";
        current = allLanguages[language];
    }

    localStorage.setItem("language", language);
};

changeLanguage();

const getCurrentLanguage = () => {
    return { current, language };
};

const i18n = (key: string, replaceMatrix?: ReplaceMatrix): string => {
    let message = current[key] || key;
    if (typeof message !== "string") return key;

    if (replaceMatrix instanceof Array && typeof message === "string") {
        for (let i = 0; i < replaceMatrix.length; i++) {
            message = message.replace("", String(replaceMatrix[i]));
        }
    }

    if (
        typeof replaceMatrix === "object" &&
        !(replaceMatrix instanceof Array) &&
        typeof message === "string"
    ) {
        for (let k in replaceMatrix) {
            if (!replaceMatrix.hasOwnProperty(k)) continue;
            message = message.replace(
                new RegExp("@" + k, "g"),
                String(replaceMatrix[k])
            );
        }
    }

    return message || key;
};

const format = {
    number: (n: number) => {
        return new IntlPolyfill.NumberFormat(language.replace("_", "-"), {
            maximumFractionDigits: 2,
        }).format(n);
    },
    currency: (n: number) => {
        return new IntlPolyfill.NumberFormat(language.replace("_", "-"), {
            style: "currency",
            currency: current.default.currency.abbreviation,
        }).format(n);
    },
    date: (date: Date, options?: Intl.DateTimeFormatOptions) => {
        if (!options) {
            options = current.default.date as Intl.DateTimeFormatOptions;
        }
        return new IntlPolyfill.DateTimeFormat(
            language.replace("_", "-"),
            options
        ).format(date);
    },
    datetime: (date: Date, options?: Intl.DateTimeFormatOptions) => {
        if (!options) {
            options = current.default.datetime as Intl.DateTimeFormatOptions;
        }
        return new IntlPolyfill.DateTimeFormat(
            language.replace("_", "-"),
            options
        ).format(date);
    },
};

export default i18n;
export type { LanguageCode, LanguageTable, ReplaceMatrix, LanguageKey };
export {
    format,
    current,
    allLanguages,
    languageKeys,
    getCurrentLanguage,
    getLanguageByDevice,
    changeLanguage,
};
