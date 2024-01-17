import Database from "./Database";
import { Draft } from "../models";

class DraftsDatabase extends Database<Draft> {
    constructor() {
        super("drafts");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Draft(data));
    }

    public override watch(listener: (drafts: Draft[]) => void) {
        return super.watch((list) => {
            const drafts = list.map((data) => new Draft(data));
            listener(drafts);
        });
    }
}

export default DraftsDatabase;
export { DraftsDatabase };
