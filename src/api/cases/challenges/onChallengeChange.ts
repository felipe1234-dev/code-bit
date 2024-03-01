import { ChallengesDatabase } from "api/databases";
import { Challenge } from "api/models";

function onChallengeChange(
    uid: string,
    listener: (challenge: Challenge | undefined) => void | Promise<void>
) {
    const challengesDB = new ChallengesDatabase();
    return challengesDB.uid(uid).watch(([challenge]) => {
        listener(challenge);
    });
}

export default onChallengeChange;
export { onChallengeChange };
