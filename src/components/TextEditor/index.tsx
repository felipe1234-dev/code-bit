import React, { useState } from "react";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";
import { useI18n } from "providers";
import styles from "./styles.module.scss";

interface TextEditorProps {
    onChange: (value: string) => void;
    value: string;
}

function TextEditor(props: TextEditorProps) {
    const { onChange, value } = props;
    const { translate } = useI18n();
    const [editorValue, setEditorValue] = useState<EditorValue>(
        RichTextEditor.createValueFromString(value, "html")
    );

    const handleChangeValue = (newEditorValue: EditorValue) => {
        setEditorValue(newEditorValue);
        const newValue = newEditorValue.toString("html");
        onChange(newValue);
    };

    const toolbarConfig: ToolbarConfig = {
        display: [
            "INLINE_STYLE_BUTTONS",
            "BLOCK_TYPE_BUTTONS",
            //"BLOCK_ALIGNMENT_BUTTONS",
            "LINK_BUTTONS",
            "BLOCK_TYPE_DROPDOWN",
            "IMAGE_BUTTON",
            "HISTORY_BUTTONS",
        ],
        INLINE_STYLE_BUTTONS: [
            { label: translate("Negrito"), style: "BOLD" },
            { label: translate("Itálico"), style: "ITALIC" },
            { label: translate("Sublinhado"), style: "UNDERLINE" },
            { label: translate("Bloco de Código"), style: "MONOSPACE" },
            { label: translate("Riscar"), style: "STRIKETHROUGH" },
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: translate("Texto normal"), style: "unstyled" },
            { label: translate("Título 1"), style: "header-one" },
            { label: translate("Título 2"), style: "header-two" },
            { label: translate("Título 3"), style: "header-three" },
        ],
        BLOCK_TYPE_BUTTONS: [
            {
                label: translate("Lista desordenada"),
                style: "unordered-list-item",
            },
            { label: translate("Lista ordenada"), style: "ordered-list-item" },
            { label: translate("Citação"), style: "blockquote" },
        ],
        BLOCK_ALIGNMENT_BUTTONS: [],
    };

    return (
        <RichTextEditor
            className={styles.TextEditor}
            toolbarClassName={styles.TextEditorToolbar}
            toolbarConfig={toolbarConfig}
            onChange={handleChangeValue}
            value={editorValue}
        />
    );
}

export default TextEditor;
export { TextEditor };
