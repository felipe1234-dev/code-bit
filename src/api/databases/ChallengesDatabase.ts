import Database from "./Database";
import { Challenge } from "../models";

class ChallengesDatabase extends Database<Challenge> {
    constructor() {
        super("challenges");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Challenge(data));
    }

    public override watch(listener: (challenges: Challenge[]) => void) {
        return super.watch((list) => {
            const challenges = list.map((data) => new Challenge(data));
            listener(challenges);
        });
    }

    public override async create(data: Challenge) {
        const newCategories = [...data.categories];
        const challengesDb = new Database("challenges");
        // @ts-ignore
        const oldCategoriesDoc: { list: string[] } = await challengesDb
            .uid("--categories")
            .getFirst();

        await challengesDb.uid("--categories").update({
            categories: Array.from(
                new Set([...newCategories, ...oldCategoriesDoc.list])
            ),
        });

        return super.create(data);
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

    public async getCategories() {
        const challengesDb = new Database("challenges");
        // @ts-ignore
        const categoriesDoc: { list: string[] } = await challengesDb
            .uid("--categories")
            .getFirst();

        return categoriesDoc.list;
    }
}

export default ChallengesDatabase;
export { ChallengesDatabase };
