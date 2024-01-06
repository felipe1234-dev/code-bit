import { Solution, User, Challenge } from "api/models";
import { RequiredPick } from "api/types";
import { codes } from "api/constants";
import { SolutionsDatabase, ChallengesDatabase } from "api/databases";
import { authentication } from "api/middlewares";

import { incrementUserXP } from "../users";
import evaluateSolution from "./evaluateSolution";

type RequiredSolutionProps = "challenge" | "code" | "unblockedSolutions";
type CreateSolutionParams = RequiredPick<
    Partial<Solution>,
    RequiredSolutionProps
>;

async function createSolution(
    solutionData: CreateSolutionParams,
    challenge?: Challenge,
    user?: User
) {
    const {
        challenge: challengeUid,
        code,
        unblockedSolutions,
        ...rest
    } = solutionData;
    if (!user) user = await authentication();

    if (!challengeUid) throw new Error(codes.solution.missingChallenge);
    if (!code) throw new Error(codes.solution.missingCode);

    const solutionsDb = new SolutionsDatabase();
    const challengesDb = new ChallengesDatabase();

    if (!challenge) challenge = await challengesDb.uid(challengeUid).getFirst();
    const challengeExists = !!challenge;
    if (!challengeExists) throw new Error(codes.challenge.notFound);

    const solution = new Solution({
        challenge: challengeUid,
        code,
        unblockedSolutions,
        upvotes: [user.uid],
        downvotes: [],
        createdBy: user.uid,
        ...rest,
    });

    if (challenge) {
        const { solved, score } = await evaluateSolution(solution, challenge);
        if (!solved) throw new Error(codes.solution.notSolved);
        await incrementUserXP(score, user);
    }

    await solutionsDb.uid(solution.uid).create(solution);

    return solution;
}

export default createSolution;
export { createSolution };
