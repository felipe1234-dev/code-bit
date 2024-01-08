import Database from "./Database";
import { Challenge } from "../models";

class ChallengesDatabase extends Database<Challenge> {
    constructor() {
        super("users");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Challenge(data));
    }

    public override watch(listener: (users: Challenge[]) => void) {
        return super.watch((list) => {
            const users = list.map((data) => new Challenge(data));
            listener(users);
        });
    }

    public async getLastIncremental() {
        this.orderBy("incremental", "desc");
        this.limit(1);

        const challenge = await this.getFirst();
        if (!challenge) return 1;

        return challenge.incremental;
    }

    public getByIncremental(incremental: number) {
        this.where("incremental", "==", incremental);
        return this.getFirst();
    }
}

export default ChallengesDatabase;
export { ChallengesDatabase };