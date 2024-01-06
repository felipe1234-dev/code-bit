import { RatingsDatabase } from "api/databases";
import { Challenge, Rating } from "api/models";

async function calculateChallengeScore(
    challenge: Challenge,
    ratings?: Rating[]
) {
    const ratingsDb = new RatingsDatabase();
    if (!ratings)
        ratings = await ratingsDb.where("challenge", "==", challenge.uid).get();

    const difficulty = challenge.difficulty;
    const ratingsAmount = ratings.length;

    let XP = difficulty * ratingsAmount;

    if (difficulty < 10) {
        XP = XP / 2;
    } else if (difficulty > 90) {
        XP = XP * 2;
    } else {
        XP = XP * Math.log10(difficulty / 10);
    }

    return XP;
}

export default calculateChallengeScore;
export { calculateChallengeScore };
