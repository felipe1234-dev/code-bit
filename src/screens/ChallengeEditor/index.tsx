import { TabsProvider, EditorProvider } from "./contexts/";
import { Composer } from "components";
import Root from "./Root";

const ChallengeEditor = () => (
    <Composer components={[TabsProvider, EditorProvider]}>
        <Root />
    </Composer>
);

export default ChallengeEditor;
export { ChallengeEditor };
