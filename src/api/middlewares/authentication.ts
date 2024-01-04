import { codes } from "api/constants";
import { UsersDatabase } from "api/databases";
import { auth } from "api/utils/services";

async function authentication() {
    const userCredential = auth.currentUser;
    if (!userCredential) throw new Error(codes.auth.unauthenticated);

    const usersDB = new UsersDatabase();
    const user = await usersDB.getByAuthId(userCredential.uid);
    if (!user) throw new Error(codes.user.notFound);

    return user;
}

export default authentication;
export { authentication };
