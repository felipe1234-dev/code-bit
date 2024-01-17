import Database from "./Database";
import { Rating } from "../models";

class RatingsDatabase extends Database<Rating> {
    constructor() {
        super("ratings");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Rating(data));
    }

    public override watch(listener: (ratings: Rating[]) => void) {
        return super.watch((list) => {
            const ratings = list.map((data) => new Rating(data));
            listener(ratings);
        });
    }
}

export default RatingsDatabase;
export { RatingsDatabase };
