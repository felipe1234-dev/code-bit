import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./styles.module.scss";

interface CodeEditorProps {
    theme?: "light" | "dark";
    language?: "javascript";
    onChange: (value: string) => void;
    value: string;
}

function CodeEditor(props: CodeEditorProps) {
    const { theme = "dark", language = "javascript", onChange, value } = props;

    const handleChangeValue = (value?: string) => {
        onChange(value || "");
    };

    return (
        <div className={styles.CodeEditor}>
            <MonacoEditor
                className={styles.CodeEditorContainer}
                theme={theme === "dark" ? "vs-dark" : theme}
                language={language}
                onChange={handleChangeValue}
                value={value}
            />
        </div>
    );
}

export default CodeEditor;
export { CodeEditor };
