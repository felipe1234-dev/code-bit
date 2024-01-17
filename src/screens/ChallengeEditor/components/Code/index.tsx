import { useEditor } from "../../contexts";
import { CodeEditor } from "components";
import styles from "./styles.module.scss";

function Code() {
    const { challenge, updateChallenge } = useEditor();

    const handleCodeChange = (code: string) => {
        updateChallenge({ code });
    };

    return (
        <div className={styles.Code}>
            <CodeEditor
                onChange={handleCodeChange}
                value={challenge.code}
            />
        </div>
    );
}

export default Code;
export { Code };
