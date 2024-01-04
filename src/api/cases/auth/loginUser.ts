import { UsersDatabase } from "api/databases";
import { codes } from "api/constants";
import { Hash, auth } from "api/utils/services";

async function loginUser(email: string, password: string) {
    const usersDB = new UsersDatabase();

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
