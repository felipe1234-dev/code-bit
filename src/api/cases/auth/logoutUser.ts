import { UsersDatabase } from "api/databases";
import { auth } from "api/utils/services";
import { authentication } from "api/middlewares";

async function logoutUser() {
    const usersDB = new UsersDatabase();
    const user = await authentication();

    await auth.signOut();
    await usersDB.uid(user.uid).update({ online: false });
    user.online = false;

    return user;
}

export default logoutUser;
export { logoutUser };
