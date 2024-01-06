import { Challenge, Solution } from "api/models";
import { RequiredPick } from "api/types";
import { codes } from "api/constants";
import { ChallengesDatabase } from "api/databases";
import { authentication } from "api/middlewares";
import { createSolution } from "../solutions";

type RequiredChallengeProps =
    | "title"
    | "description"
    | "categories"
    | "tests"
    | "code";
type CreateChallengeParams = RequiredPick<
    Partial<Challenge>,
    RequiredChallengeProps
>;

async function createChallenge(
    challengeData: CreateChallengeParams,
    creatorSolutionCode: string,
    unblockedSolutions: boolean
) {
    const { title, description, categories, tests, code, ...rest } =
        challengeData;
    const user = await authentication();

    if (!title) throw new Error(codes.challenge.missingTitle);
    if (!description) throw new Error(codes.challenge.missingDescription);
    if (!categories || categories.length === 0)
        throw new Error(codes.challenge.missingCategories);
    if (!tests || tests.length === 0)
        throw new Error(codes.challenge.missingTests);
    if (!code) throw new Error(codes.challenge.missingCode);

    const challengesDb = new ChallengesDatabase();

    const lastIncremental = await challengesDb.getLastIncremental();
    const newIncremental = 1 + lastIncremental;

    const tags = [title, description].reduce((allTags, str) => {
        const newTags = str.split(" ").map((word) => word.toLowerCase());
        allTags.push(...newTags);
        return allTags;
    }, [] as string[]);

    const challenge = new Challenge({
        incremental: newIncremental,
        title,
        description,
        tests,
        code,
        categories,
        tags,
        difficulty: 50,
        createdBy: user.uid,
        ...rest,
    });

    const creatorSolution = new Solution({
        challenge: challenge.uid,
        code: creatorSolutionCode,
        unblockedSolutions,
        upvotes: [user.uid],
        downvotes: [],
        createdBy: user.uid,
    });

    await createSolution(creatorSolution, challenge, user);
    await challengesDb.uid(challenge.uid).create(challenge);

    return challenge;
}

export default createChallenge;
export { createChallenge };
