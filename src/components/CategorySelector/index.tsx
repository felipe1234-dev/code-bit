import React, { useState } from "react";
import {
    TextField,
    Autocomplete,
    Chip,
    AutocompleteRenderInputParams,
    AutocompleteRenderGetTagProps,
} from "@mui/material";

import * as Api from "api";
import { useAsyncEffect } from "hooks";
import { onEnterPress } from "utils/functions";
import { useI18n } from "providers";

import styles from "./styles.module.scss";

interface CategorySelectorProps {
    createCategoryOnEnter?: boolean;
    onChange: (value: string[]) => void;
    value: string[];
}

function CategorySelector(props: CategorySelectorProps) {
    const { createCategoryOnEnter = false, onChange, value } = props;
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const { translate } = useI18n();

    const handleAddCategory = () => {
        const categoryExists = categories.includes(newCategory);
        if (!createCategoryOnEnter && !categoryExists) {
            return;
        }

        const newCategories = Array.from(new Set([...categories, newCategory]));

        setCategories(newCategories);
        onChange(newCategories);

        setNewCategory("");
    };

    const handleUpdateCategories = (_: any, newValue: string[]) => {
        onChange(Array.from(new Set([...newValue])));
    };

    const renderInput = (props: AutocompleteRenderInputParams) => (
        <TextField
            {...props}
            onChange={(evt) => setNewCategory(evt.target.value)}
            onKeyDown={onEnterPress(handleAddCategory)}
            placeholder={translate("Categorias")}
        />
    );

    const renderTags = (
        value: string[],
        getTagProps: AutocompleteRenderGetTagProps
    ) =>
        value.map((tag) => {
            const i = value.indexOf(tag);
            const baseProps = getTagProps({
                index: i,
            });

            baseProps.className += " " + styles.CategorySelectorChip;

            return (
                <Chip
                    {...baseProps}
                    key={tag}
                    label={tag}
                />
            );
        });

    useAsyncEffect(async () => {
        const categories = await Api.cases.challenges.listCategories();
        setCategories(categories);
    }, []);

    return (
        <Autocomplete
            multiple
            fullWidth
            filterSelectedOptions
            className={styles.CategorySelectorCategories}
            options={categories}
            getOptionLabel={(option) => option}
            onChange={handleUpdateCategories}
            value={value}
            renderInput={renderInput}
            renderTags={renderTags}
            noOptionsText={translate("Nenhuma opção")}
        />
    );
}

export default CategorySelector;
export { CategorySelector };
export type { CategorySelectorProps };
