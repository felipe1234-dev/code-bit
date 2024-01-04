import { codes } from "api/constants";

const pt_BR = {
    default: {
        currency: {
            abbreviation: "BRL",
            symbol: "R$",
            separator: ",",
            delimiter: ".",
        },
        date: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        },
        datetime: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        },
    },
    pt_BR: "Português (BR)",
    pt_PT: "Português (PT)",
    en_US: "English (US)",
    [codes.auth.unknownError]: "Erro desconhecido",
    [codes.auth.emailAlreadyTaken]: "Email já está em uso",
    [codes.auth.unauthenticated]: "Não está autenticado",
    [codes.auth.unauthorized]: "Não autorizado",
    [codes.auth.wrongEmail]: "Email incorreto",
    [codes.auth.wrongPassword]: "Senha incorreta",
};

export default pt_BR;
