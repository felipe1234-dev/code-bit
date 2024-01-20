import { ChallengesDatabase } from "api/databases";

function listCategories() {
    const challengesDb = new ChallengesDatabase();
    return challengesDb.getCategories();
}

export default listCategories;
export { listCategories };
