import { Solution, Challenge } from "api/models";
import calculateChallengeScore from "../challenges/calculateChallengeScore";

async function evaluateSolution(solution: Solution, challenge: Challenge) {
    const results: boolean[] = [];

    for (const test of challenge.tests) {
        const result = !!eval(`(() => {
            ${solution.code}
       
            return ${test};
        })()`);
        results.push(result);
    }

    const solved = results.every(Boolean);
    const score =
        solved || solution.unblockedSolutions
            ? await calculateChallengeScore(challenge)
            : 0;

    return {
        solved,
        results,
        score,
    };
}

export default evaluateSolution;
export { evaluateSolution };
