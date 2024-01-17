import { DraftsDatabase } from "api/databases";

async function getDraftByUid(uid: string) {
    const draftsDb = new DraftsDatabase();
    const results = await draftsDb.uid(uid).get();
    return results[0];
}

export { getDraftByUid };
export default getDraftByUid;
