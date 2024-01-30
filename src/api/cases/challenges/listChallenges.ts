import { ChallengesDatabase } from "api/databases";
import { Challenge } from "api/models";
import { FilterParams } from "api/types";

function listChallenges(params: FilterParams<Challenge>) {
    const { where = [], limit, startAfter, orderBy } = params;
    let query = new ChallengesDatabase();

    for (const [field, operator, value] of where) {
        query = query.where(field, operator, value);
    }

    if (typeof limit === "number") {
        query = query.limit(limit);
    }

    if (startAfter) {
        query = query.startAfter(startAfter);
    }

    if (orderBy) {
        query = query.orderBy(...orderBy);
    }

    return query.get();
}

export default listChallenges;
export { listChallenges };
