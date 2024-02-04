import React, { useState } from "react";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";
import { useI18n } from "providers";
import useTextEditor from "./useTextEditor";
import styles from "./styles.module.scss";

interface TextEditorProps {
    theme?: "light" | "dark";
    onChange: (value: string) => void;
    value: string;
}

function TextEditor(props: TextEditorProps) {
    const { theme = "dark" } = props;
    const { editorValue, handleChangeValue, toolbarConfig, styleMap } =
        useTextEditor(props);

    return (
        <div
            className={styles.TextEditor}
            data-theme={theme}
        >
            <RichTextEditor
                className={styles.TextEditor}
                toolbarClassName={styles.TextEditorToolbar}
                toolbarConfig={toolbarConfig}
                editorClassName={styles.TextEditorContainer}
                onChange={handleChangeValue}
                value={editorValue}
                customStyleMap={styleMap}
            />
        </div>
    );
}

export default TextEditor;
export { TextEditor };
export type { TextEditorProps };
