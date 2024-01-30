import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Difficulty, useChallengeList } from "../../providers";
import { useI18n } from "providers";
import { CategorySelector } from "components";

import styles from "./styles.module.scss";

const difficulties: { label: string; value: Difficulty }[] = [
    {
        label: "Muito fácil",
        value: "0-20",
    },
    {
        label: "Fácil",
        value: "21-40",
    },
    {
        label: "Médio",
        value: "41-60",
    },
    {
        label: "Difícil",
        value: "61-80",
    },
    {
        label: "Muito difícil",
        value: "81-100",
    },
];

function Filters() {
    const { translate } = useI18n();
    const { loading, filters, changeFilters } = useChallengeList();

    const [mirrorDifficulty, setMirrorDifficulty] = useState(
        filters.difficulty
    );
    const [mirrorCategories, setMirrorCategories] = useState(
        filters.categories
    );

    const handleChangeMirrorDifficulty = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        const [minDifficulty, maxDifficulty] = evt.target.value
            .split("-")
            .map(Number);
        setMirrorDifficulty(`${minDifficulty}-${maxDifficulty}`);
    };

    const handleApplyFilters = () => {
        changeFilters({
            difficulty: mirrorDifficulty,
            categories: mirrorCategories,
        });
    };

    useEffect(() => {
        setMirrorDifficulty(filters.difficulty);
        setMirrorCategories(filters.categories);
    }, [filters]);

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
