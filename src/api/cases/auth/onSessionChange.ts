import { UsersDatabase } from "api/databases";
import { auth } from "api/utils/services";
import { User } from "api/models";

function onSessionChange(
    listener: (user: User | undefined) => void | Promise<void>
) {
    return auth.onAuthStateChanged(async (userCredential) => {
        if (userCredential) {
            const usersDB = new UsersDatabase();
            const user = await usersDB.getByAuthId(userCredential.uid);
            return listener(user);
        }
        listener(undefined);
    });
}

export default onSessionChange;
export { onSessionChange };
