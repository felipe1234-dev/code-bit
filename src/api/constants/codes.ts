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
    challenge: {
        notFound: "CHALLENGE_NOT_FOUND" as const,
        missingTitle: "CHALLENGE_MISSING_TITLE" as const,
        missingDescription: "CHALLENGE_MISSING_DESCRIPTION" as const,
        missingCategories: "CHALLENGE_MISSING_CATEGORIES" as const,
        missingTests: "CHALLENGE_MISSING_TESTS" as const,
        missingCode: "CHALLENGE_MISSING_CODE" as const,
    },
    solution: {
        notFound: "SOLUTION_NOT_FOUND" as const,
        notSolved: "SOLUTION_NOT_SOLVED" as const,
        missingChallenge: "SOLUTION_MISSING_CHALLENGE" as const,
        missingCode: "SOLUTION_MISSING_CODE" as const,
    },
};

export default codes;
export { codes };
