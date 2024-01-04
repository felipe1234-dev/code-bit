const defaultAlgorithm = "SHA-256";

class Hash {
    public static async create(
        password: string,
        salt: string,
        algorithm = defaultAlgorithm
    ) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((byte) => ("00" + byte.toString(16)).slice(-2))
            .join("");
        return hashHex;
    }

    public static async compare(
        password: string,
        hashToCompare: string,
        salt: string,
        algorithm = defaultAlgorithm
    ) {
        const hashedPassword = await Hash.create(password, salt, algorithm);
        return hashedPassword === hashToCompare;
    }

    public static generateSalt() {
        const randomArray = new Uint8Array(16);
        crypto.getRandomValues(randomArray);

        const salt = Array.from(randomArray)
            .map((byte) => ("00" + byte.toString(16)).slice(-2))
            .join("");

        return salt;
    }
}

export default Hash;
export { Hash };
