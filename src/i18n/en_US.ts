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
    Entrar: "Login",
    Cadastrar: "Register",
    "Desafie sua mente, ganhe XP e domine a arte da programação enquanto se diverte!":
        "Challenge your mind, earn XP, and master the art of programming while having fun!",
    "Explorar os desafios": "Explore challenges",
    "Desafio aleatório": "Random challenge",
    "Endereço de Email": "Email Address",
    "exemplo@gmail.com": "example@gmail.com",
    Senha: "Password",
    "Confirme a senha": "Confirm your password",
    senha123: "password123",
    "Foto de perfil": "Profile picture",
    "Conta criada com sucesso": "Account created successfully",
    "Seu perfil": "Your profile",
    "Sair da conta": "Logout",
    Criar: "Create",
    [codes.auth.unknownError]: "Unknown error",
    [codes.auth.emailAlreadyTaken]: "Email already taken",
    [codes.auth.unauthenticated]: "Unauthenticated",
    [codes.auth.unauthorized]: "Unauthorized",
    [codes.auth.invalidEmail]: "Invalid email",
    [codes.auth.wrongEmail]: "Wrong email",
    [codes.auth.wrongPassword]: "Wrong password",
    [codes.auth.passwordRequired]: "Password is required",
    [codes.auth.wrongConfirmPassword]: "Confirm password field doesn't match",
    [codes.challenge.missingTitle]: "A title is mandatory for your challenge!",
    [codes.challenge.missingDescription]:
        "A challenge needs a description so users know what to do!",
    [codes.challenge.missingCategories]:
        "Add categories for users to search for your challenge",
    [codes.challenge.missingTests]:
        "Add at least 1 test to evaluate user solutions",
    [codes.challenge.missingCode]:
        "Add a base code for the user to know the parameters and function name",
    [codes.challenge.notFound]: "Challenge not found",
    [codes.solution.notFound]: "Solution not found",
    [codes.solution.notSolved]: "Oops, this solution didn't work",
};

export default en_US;
