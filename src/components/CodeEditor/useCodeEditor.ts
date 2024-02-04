import { useState } from "react";

import * as Api from "api";
import { useAsyncEffect } from "hooks";

import { CodeEditorProps } from "./index";

function useCodeEditor(props: CodeEditorProps) {
    const { theme = "dark", onChange } = props;

    const handleChangeValue = (value?: string) => {
        onChange(value || "");
    };

    return { handleChangeValue, theme: theme === "dark" ? "vs-dark" : theme };
}

export default useCodeEditor;
