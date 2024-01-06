import Database from "./Database";
import { Solution } from "../models";

class SolutionsDatabase extends Database<Solution> {
    constructor() {
        super("users");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Solution(data));
    }

    public override watch(listener: (users: Solution[]) => void) {
        return super.watch((list) => {
            const users = list.map((data) => new Solution(data));
            listener(users);
        });
    }
}

export default SolutionsDatabase;
export { SolutionsDatabase };
