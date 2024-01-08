import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
    onChange: (value: string) => void;
    value: string;
}

function CodeEditor(props: CodeEditorProps) {
    const { onChange, value } = props;

    const handleChangeValue = (value?: string) => {
        onChange(value || "");
    };

    return (
        <div>
            <MonacoEditor
                onChange={handleChangeValue}
                value={value}
            />
        </div>
    );
}

export default CodeEditor;
export { CodeEditor };
