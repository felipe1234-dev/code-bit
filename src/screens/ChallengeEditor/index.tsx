import { EditorProvider } from "./contexts/";
import Root from "./Root";

const ChallengeEditor = () => (
    <EditorProvider>
        <Root />
    </EditorProvider>
);

export default ChallengeEditor;
export { ChallengeEditor };
