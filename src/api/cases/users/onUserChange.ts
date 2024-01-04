import { UsersDatabase } from "api/databases";
import { User } from "api/models";

function onUserChange(
    uid: string,
    listener: (user: User | undefined) => void | Promise<void>
) {
    const usersDB = new UsersDatabase();
    return usersDB.uid(uid).watch(([user]) => {
        listener(user);
    });
}

export default onUserChange;
export { onUserChange };
