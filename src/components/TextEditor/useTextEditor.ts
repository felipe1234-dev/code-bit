import { useState } from "react";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";
import { useI18n } from "providers";
import { TextEditorProps } from "./index";

function useTextEditor(props: TextEditorProps) {
    const { theme = "dark", onChange, value } = props;
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
            {
                label: translate("Itálico"),
                style: "ITALIC",
            },
            {
                label: translate("Sublinhado"),
                style: "UNDERLINE",
            },
            {
                label: translate("Bloco de Código"),
                style: "CODE",
            },
            {
                label: translate("Riscar"),
                style: "STRIKETHROUGH",
            },
        ],
        BLOCK_TYPE_DROPDOWN: [
            {
                label: translate("Texto normal"),
                style: "unstyled",
            },
            {
                label: translate("Título 1"),
                style: "header-one",
            },
            {
                label: translate("Título 2"),
                style: "header-two",
            },
            {
                label: translate("Título 3"),
                style: "header-three",
            },
        ],
        BLOCK_TYPE_BUTTONS: [
            {
                label: translate("Lista desordenada"),
                style: "unordered-list-item",
            },
            {
                label: translate("Lista ordenada"),
                style: "ordered-list-item",
            },
            {
                label: translate("Citação"),
                style: "blockquote",
            },
        ],
        BLOCK_ALIGNMENT_BUTTONS: [],
    };

    const styleMap = {
        CODE: {
            backgroundColor: theme === "light" ? "#f5f5f5" : "rgb(192 201 204)",
            color: theme === "light" ? "#212121" : "#000",
            fontFamily: "Inconsolata, Menlo, Consolas, monospace",
            fontSize: 16,
            padding: "2px 5px",
        },
    };

    return { editorValue, handleChangeValue, toolbarConfig, styleMap };
}

export default useTextEditor;
