import React, { useEffect, useState } from "react";
import { Difficulty, useChallengeList } from "../../providers";

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

function useFilters() {
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

    return {
        loading,
        difficulties,
        mirrorCategories,
        mirrorDifficulty,
        handleChangeMirrorDifficulty,
        handleApplyFilters,
        setMirrorCategories,
        setMirrorDifficulty,
    };
}

export default useFilters;
