import { UsersDatabase } from "api/databases";
import { codes } from "api/constants";
import { Hash, auth } from "api/utils/services";
import { validateEmail } from "api/utils/functions";

async function loginUser(email: string, password: string) {
    const usersDB = new UsersDatabase();

    const emailIsValid = validateEmail(email);
    if (!emailIsValid) throw new Error(codes.auth.invalidEmail);
    if (!password) throw new Error(codes.auth.passwordRequired);

    const user = await usersDB.getByEmail(email);
    if (!user) throw new Error(codes.auth.wrongEmail);

    const matches = await Hash.compare(
        password,
        user.hashedPassword,
        user.salt
    );
    if (!matches) throw new Error(codes.auth.wrongPassword);

    await auth.signInWithEmailAndPassword(email, password);
    await usersDB.uid(user.uid).update({ online: true });
    user.online = true;

    return user;
}

export default loginUser;
export { loginUser };
