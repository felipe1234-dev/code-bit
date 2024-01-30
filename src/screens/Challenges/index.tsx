import { ChallengeListProvider } from "./providers";
import { Composer } from "components";
import Root from "./Root";

const Challenges = () => (
    <Composer components={[ChallengeListProvider]}>
        <Root />
    </Composer>
);

export default Challenges;
export { Challenges };
