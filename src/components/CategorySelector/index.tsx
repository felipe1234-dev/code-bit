import React from "react";
import {
    TextField,
    Autocomplete,
    Chip,
    AutocompleteRenderInputParams,
    AutocompleteRenderGetTagProps,
} from "@mui/material";

import { onEnterPress } from "utils/functions";
import { useI18n } from "providers";

import useCategorySelector from "./useCategorySelector";

import styles from "./styles.module.scss";

interface CategorySelectorProps {
    createCategoryOnEnter?: boolean;
    onChange: (value: string[]) => void;
    value: string[];
}

function CategorySelector(props: CategorySelectorProps) {
    const { value } = props;
    const {
        handleAddCategory,
        handleUpdateCategories,
        setNewCategory,
        categories,
    } = useCategorySelector(props);

    const { translate } = useI18n();

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
