import Database from "./Database";
import { User } from "../models";

class UsersDatabase extends Database<User> {
    constructor() {
        super("users");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new User(data));
    }

    public override watch(listener: (users: User[]) => void) {
        return super.watch((list) => {
            const users = list.map((data) => new User(data));
            listener(users);
        });
    }

    public getByEmail(email: string) {
        this.where("email", "==", email);
        return this.getFirst();
    }

    public getByAuthId(authId: string) {
        this.where("authId", "==", authId);
        return this.getFirst();
    }
}

export default UsersDatabase;
export { UsersDatabase };
