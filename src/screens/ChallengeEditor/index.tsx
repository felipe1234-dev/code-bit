import { EditorProvider } from "./providers";
import { Composer } from "components";
import Root from "./Root";

const ChallengeEditor = () => (
    <Composer components={[EditorProvider]}>
        <Root />
    </Composer>
);

export default ChallengeEditor;
export { ChallengeEditor };
