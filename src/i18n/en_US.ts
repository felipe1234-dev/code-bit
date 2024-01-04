import { codes } from "api/constants";

const en_US = {
    default: {
        currency: {
            abbreviation: "USD",
            symbol: "$",
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
    [codes.auth.unknownError]: "Unknown error",
    [codes.auth.emailAlreadyTaken]: "Email already taken",
    [codes.auth.unauthenticated]: "Unauthenticated",
    [codes.auth.unauthorized]: "Unauthorized",
    [codes.auth.wrongEmail]: "Wrong email",
    [codes.auth.wrongPassword]: "Wrong password",
    Entrar: "Login",
    Cadastrar: "Register",
    "Desafie sua mente, ganhe XP e domine a arte da programação enquanto se diverte!":
        "Challenge your mind, earn XP, and master the art of programming while having fun!",
    "Explorar os desafios": "Explore challenges",
    "Desafio aleatório": "Random challenge",
    "Endereço de Email": "Email Address",
    "exemplo@gmail.com": "example@gmail.com",
    Senha: "Password",
    senha123: "password123",
};

export default en_US;
