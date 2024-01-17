import { Challenge, Draft } from "api/models";
import { DraftsDatabase } from "api/databases";
import { authentication } from "api/middlewares";

async function saveChallengeAsDraft(data: Partial<Challenge>) {
    const user = await authentication();
    const draft = new Draft({
        ...data,
        createdBy: user.uid,
        lastSavedAt: new Date(),
    });
    const draftsDb = new DraftsDatabase();

    const exists = await draftsDb.uid(draft.uid).exists();
    await draftsDb.uid(draft.uid)[exists ? "update" : "create"](draft);

    return draft;
}

export { saveChallengeAsDraft };
export default saveChallengeAsDraft;
