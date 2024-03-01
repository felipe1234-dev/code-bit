import { DraftsDatabase } from "api/databases";
import { Draft } from "api/models";

function onDraftChange(
    uid: string,
    listener: (draft: Draft | undefined) => void | Promise<void>
) {
    const draftsDB = new DraftsDatabase();
    return draftsDB.uid(uid).watch(([draft]) => {
        listener(draft);
    });
}

export default onDraftChange;
export { onDraftChange };
