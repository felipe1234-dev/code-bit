import { useEditor } from "../../providers";
import { CodeEditor } from "components";
import useCode from "./useCode";
import styles from "./styles.module.scss";

function Code() {
    const { challenge } = useEditor();
    const { handleCodeChange } = useCode();

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
