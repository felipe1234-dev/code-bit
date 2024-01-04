const codes = {
    auth: {
        unknownError: "UNKNOWN_ERROR" as const,
        emailAlreadyTaken: "EMAIL_ALREADY_TAKEN" as const,
        wrongEmail: "WRONG_EMAIL" as const,
        wrongPassword: "WRONG_PASSWORD" as const,
        missingJwtKey: "PRIVATE_JWT_KEY_NOT_FOUND" as const,
        expiredJwtToken: "JWT_TOKEN_EXPIRED" as const,
        unauthorized: "UNAUTHORIZED" as const,
        unauthenticated: "UNAUTHENTICATED" as const,
    },
    user: {
        notFound: "USER_NOT_FOUND" as const,
    },
};

export default codes;
export { codes };
