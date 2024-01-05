const codes = {
    auth: {
        unknownError: "UNKNOWN_ERROR" as const,
        emailAlreadyTaken: "EMAIL_ALREADY_TAKEN" as const,
        invalidEmail: "INVALID_EMAIL" as const,
        wrongEmail: "WRONG_EMAIL" as const,
        wrongPassword: "WRONG_PASSWORD" as const,
        passwordRequired: "PASSWORD_REQUIRED" as const,
        wrongConfirmPassword: "WRONG_CONFIRM_PASSWORD" as const,
        missingJwtKey: "PRIVATE_JWT_KEY_NOT_FOUND" as const,
        expiredJwtToken: "JWT_TOKEN_EXPIRED" as const,
        unauthorized: "UNAUTHORIZED" as const,
        unauthenticated: "UNAUTHENTICATED" as const,
        missingFirstName: "MISSING_FIRST_NAME" as const,
        missingLastName: "MISSING_LAST_NAME" as const,
    },
    user: {
        notFound: "USER_NOT_FOUND" as const,
    },
};

export default codes;
export { codes };
