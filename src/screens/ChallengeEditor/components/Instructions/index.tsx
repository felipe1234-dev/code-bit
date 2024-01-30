import React from "react";
import { TextField } from "@mui/material";

import { TextEditor, CategorySelector } from "components";
import { useI18n } from "providers";
import { useEditor } from "../../providers";

import styles from "./styles.module.scss";

function Instructions() {
    const { translate } = useI18n();
    const { challenge, updateChallenge, handleUpdateChallenge } = useEditor();

    const handleUpdateDescription = (text: string) => {
        updateChallenge({ description: text });
    };

    const handleUpdateCategories = (value: string[]) => {
        updateChallenge({
            categories: Array.from(new Set([...value])),
        });
    };

    return (
        <div className={styles.Instructions}>
            <TextField
                variant="standard"
                InputProps={{ className: styles.InstructionsTitle }}
                placeholder={translate("Título do desafio")}
                onChange={handleUpdateChallenge("title")}
                value={challenge.title}
            />

            <CategorySelector
                createCategoryOnEnter
                onChange={handleUpdateCategories}
                value={challenge.categories}
            />

            <hr />

            <TextEditor
                key={challenge.uid}
                theme="dark"
                onChange={handleUpdateDescription}
                value={challenge.description}
            />
        </div>
    );
}

export default Instructions;
export { Instructions };
