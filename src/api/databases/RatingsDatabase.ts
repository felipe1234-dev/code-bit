import Database from "./Database";
import { Rating } from "../models";

class RatingsDatabase extends Database<Rating> {
    constructor() {
        super("users");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Rating(data));
    }

    public override watch(listener: (users: Rating[]) => void) {
        return super.watch((list) => {
            const users = list.map((data) => new Rating(data));
            listener(users);
        });
    }
}

export default RatingsDatabase;
export { RatingsDatabase };
