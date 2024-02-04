import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useI18n } from "providers";
import { CategorySelector } from "components";
import useFilters from "./useFilters";

import styles from "./styles.module.scss";

function Filters() {
    const {
        loading,
        difficulties,
        mirrorCategories,
        mirrorDifficulty,
        handleApplyFilters,
        handleChangeMirrorDifficulty,
        setMirrorCategories,
    } = useFilters();
    const { translate } = useI18n();

    return (
        <aside className={styles.Filters}>
            <TextField
                select
                fullWidth
                variant="outlined"
                label={translate("Dificuldade")}
                onChange={handleChangeMirrorDifficulty}
                value={mirrorDifficulty}
            >
                {difficulties.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {translate(option.label)}
                    </MenuItem>
                ))}
            </TextField>
            <CategorySelector
                onChange={setMirrorCategories}
                value={mirrorCategories}
            />
            <LoadingButton
                fullWidth
                loading={loading}
                onClick={handleApplyFilters}
            >
                {translate("Filtrar")}
            </LoadingButton>
        </aside>
    );
}

export default Filters;
export { Filters };
