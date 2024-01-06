import { User } from "api/models";
import { authentication } from "api/middlewares";
import { UsersDatabase } from "api/databases";

async function incrementUserXP(xp: number, user?: User) {
    if (!user) user = await authentication();

    xp += user.xp;

    let level = Math.sqrt(xp / 100);
    level = Math.floor(level);

    const usersDb = new UsersDatabase();
    await usersDb.uid(user.uid).update({
        xp,
        level,
    });

    return {
        xp,
        level,
    };
}

export default incrementUserXP;
export { incrementUserXP };
