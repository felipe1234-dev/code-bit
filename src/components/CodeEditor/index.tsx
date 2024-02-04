import React from "react";
import MonacoEditor from "@monaco-editor/react";
import useCodeEditor from "./useCodeEditor";
import styles from "./styles.module.scss";

interface CodeEditorProps {
    theme?: "light" | "dark";
    language?: "javascript";
    onChange: (value: string) => void;
    value: string;
}

function CodeEditor(props: CodeEditorProps) {
    const { language = "javascript", value } = props;
    const { handleChangeValue, theme } = useCodeEditor(props);

    return (
        <div className={styles.CodeEditor}>
            <MonacoEditor
                className={styles.CodeEditorContainer}
                theme={theme}
                language={language}
                onChange={handleChangeValue}
                value={value}
            />
        </div>
    );
}

export default CodeEditor;
export { CodeEditor };
export type { CodeEditorProps };
