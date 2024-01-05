import { codes } from "api/constants";

const pt_BR = {
    default: {
        currency: {
            abbreviation: "EUR",
            symbol: "€",
            separator: ".",
            delimiter: "",
        },
        date: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        },
        datetime: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        },
    },
    pt_BR: "Português (BR)",
    pt_PT: "Português (PT)",
    en_US: "English (US)",
    [codes.auth.unknownError]: "Erro desconhecido",
    [codes.auth.emailAlreadyTaken]: "Email já em uso",
    [codes.auth.invalidEmail]: "Email inválido",
    [codes.auth.passwordRequired]: "Campo senha faltando",
    [codes.auth.unauthenticated]: "Não estás autenticado",
    [codes.auth.unauthorized]: "Não autorizado",
    [codes.auth.wrongEmail]: "Email incorrecto",
    [codes.auth.wrongPassword]: "Senha incorrecta",
    [codes.auth.wrongConfirmPassword]: "Campo confirme sua senha não é igual",
};

export default pt_BR;
