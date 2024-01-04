import { UsersDatabase } from "api/databases";
import { codes } from "api/constants";
import { User } from "api/models";
import { Hash, auth } from "api/utils/services";

async function registerUser(
    email: string,
    password: string,
    customData?: Partial<User>
) {
    const usersDB = new UsersDatabase();

    const emailInUse = !!(await usersDB.getByEmail(email));
    if (emailInUse) throw new Error(codes.auth.emailAlreadyTaken);

    const salt = Hash.generateSalt();
    const hashedPassword = await Hash.create(password, salt);
    const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
    );
    const authId = userCredential.user?.uid;
    if (!authId) throw new Error(codes.auth.unknownError);

    const user = new User({
        ...customData,
        hashedPassword,
        salt,
        email,
        authId,
    });
    await usersDB.uid(user.uid).create(user);

    return user;
}

export default registerUser;
export { registerUser };
