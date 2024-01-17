import Database from "./Database";
import { Solution } from "../models";

class SolutionsDatabase extends Database<Solution> {
    constructor() {
        super("solutions");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Solution(data));
    }

    public override watch(listener: (solutions: Solution[]) => void) {
        return super.watch((list) => {
            const solutions = list.map((data) => new Solution(data));
            listener(solutions);
        });
    }
}

export default SolutionsDatabase;
export { SolutionsDatabase };
