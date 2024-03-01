import { DraftsDatabase } from "api/databases";
import { Draft } from "api/models";
import { FilterParams } from "api/types";

function listDrafts(params: FilterParams<Draft>) {
    const { where = [], limit, startAfter, orderBy } = params;
    let query = new DraftsDatabase();

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

export default listDrafts;
export { listDrafts };
