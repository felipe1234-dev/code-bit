import React, { useState } from "react";
import {
    TextField,
    Autocomplete,
    Chip,
    AutocompleteRenderInputParams,
    AutocompleteRenderGetTagProps,
} from "@mui/material";

import { TextEditor } from "components";
import { useI18n } from "providers";
import { onEnterPress } from "utils/functions";
import { useEditor } from "../../providers";

import styles from "./styles.module.scss";

function Instructions() {
    const { translate } = useI18n();
    const {
        challenge,
        updateChallenge,
        handleUpdateChallenge,
        categories,
        setCategories,
    } = useEditor();
    const [value, setValue] = useState("");

    const handleUpdateDescription = (text: string) => {
        updateChallenge({ description: text });
    };

    const handleAddCategory = () => {
        const newCategory = value;
        setCategories((prev) => Array.from(new Set([...prev, newCategory])));
        updateChallenge({
            categories: Array.from(
                new Set([...challenge.categories, newCategory])
            ),
        });
        setValue("");
    };

    const handleUpdateCategories = (_: any, value: string[]) => {
        updateChallenge({
            categories: Array.from(new Set([...value])),
        });
    };

    const renderInput = (props: AutocompleteRenderInputParams) => (
        <TextField
            {...props}
            onChange={(evt) => setValue(evt.target.value)}
            onKeyDown={onEnterPress(handleAddCategory)}
            placeholder={translate("Categorias")}
        />
    );

    const renderTags = (
        value: string[],
        getTagProps: AutocompleteRenderGetTagProps
    ) =>
        value.map((tag) => {
            const i = challenge.categories.indexOf(tag);
            const baseProps = getTagProps({
                index: i,
            });

            baseProps.className += " " + styles.InstructionsChip;

            return (
                <Chip
                    {...baseProps}
                    key={tag}
                    label={tag}
                />
            );
        });

    return (
        <div className={styles.Instructions}>
            <TextField
                variant="standard"
                InputProps={{ className: styles.InstructionsTitle }}
                placeholder={translate("Título do desafio")}
                onChange={handleUpdateChallenge("title")}
                value={challenge.title}
            />

            <Autocomplete
                multiple
                filterSelectedOptions
                className={styles.InstructionsCategories}
                options={categories}
                getOptionLabel={(option) => option}
                onChange={handleUpdateCategories}
                value={challenge.categories}
                renderInput={renderInput}
                renderTags={renderTags}
                noOptionsText={translate("Nenhuma opção")}
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
