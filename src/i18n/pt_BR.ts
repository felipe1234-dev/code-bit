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
    [codes.auth.invalidEmail]: "Email inválido",
    [codes.auth.passwordRequired]: "Campo senha faltando",
    [codes.auth.unauthenticated]: "Não está autenticado",
    [codes.auth.unauthorized]: "Não autorizado",
    [codes.auth.wrongEmail]: "Email incorreto",
    [codes.auth.wrongPassword]: "Senha incorreta",
    [codes.auth.wrongConfirmPassword]: "Campo confirme sua senha não é igual",
    [codes.challenge.missingTitle]:
        "É obrigatório colocar um título para seu desafio!",
    [codes.challenge.missingDescription]:
        "Um desafio precisa de uma descrição para os usuários saberem o que fazer!",
    [codes.challenge.missingCategories]:
        "Adicione categorias para pesquisarem pelo seu desafio",
    [codes.challenge.missingTests]:
        "Adicione pelo menos 1 teste para avaliar as soluções dos usuários",
    [codes.challenge.missingCode]:
        "Adicione um código base para o usuário saber quais parâmetros e o nome da função",
    [codes.challenge.notFound]: "Desafio não encontrado",
    [codes.solution.notFound]: "Solução não encontrada",
    [codes.solution.notSolved]: "Oops, essa solução não funcionou",
};

export default pt_BR;
