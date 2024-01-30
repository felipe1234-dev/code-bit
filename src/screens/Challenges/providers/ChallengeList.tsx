import React, { createContext, useContext, useMemo, useState } from "react";

import * as Api from "api";
import { Challenge } from "api/models";
import { FilterParams } from "types";
import { useAsyncEffect } from "hooks";

type Difficulty = `${number}-${number}`;

interface ChallengeListValue {
    loading: boolean;
    challenges: Challenge[];
    filters: {
        difficulty: Difficulty;
        categories: string[];
    };
    changeFilters: (filters: {
        difficulty?: Difficulty;
        categories?: string[];
    }) => void;
    loadMore: () => Promise<void>;
}

const ChallengeListContext = createContext<ChallengeListValue | undefined>(
    undefined
);

function ChallengeListProvider(props: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [difficulty, setDifficulty] = useState<Difficulty>("0-20");
    const [categories, setCategories] = useState<string[]>([]);

    const [minDifficulty, maxDifficulty] = useMemo(() => {
        return difficulty.split("-").map(Number);
    }, [difficulty]);

    const changeFilters = (filters: {
        difficulty?: Difficulty;
        categories?: string[];
    }) => {
        const { difficulty: newDifficulty, categories: newCategories } =
            filters;
        if (newDifficulty) setDifficulty(newDifficulty);
        if (newCategories) setCategories(newCategories);
    };

    const loadMore = async () => {
        const lastChallenge = challenges[challenges.length - 1];
        if (!lastChallenge) return;

        const where: FilterParams<Challenge>["where"] = [];
        const startAfter = lastChallenge.uid;

        where.push(["difficulty", ">=", minDifficulty]);
        where.push(["difficulty", "<=", maxDifficulty]);
        if (categories.length > 0)
            where.push(["categories", "array-contains-any", [...categories]]);

        const newChallenges = await Api.cases.challenges.listChallenges({
            where,
            startAfter,
            limit: 20,
        });

        setChallenges((prev) => [...prev, ...newChallenges]);
    };

    useAsyncEffect(async () => {
        setLoading(true);

        const where: FilterParams<Challenge>["where"] = [];
        where.push(["difficulty", ">=", minDifficulty]);
        where.push(["difficulty", "<=", maxDifficulty]);
        if (categories.length > 0)
            where.push(["categories", "array-contains-any", [...categories]]);

        const fetchedChallenges = await Api.cases.challenges.listChallenges({
            where,
            limit: 20,
        });

        setChallenges(fetchedChallenges);

        setLoading(false);
    }, [minDifficulty, maxDifficulty, difficulty]);

    return (
        <ChallengeListContext.Provider
            value={{
                loading,
                challenges,
                filters: { difficulty, categories },
                changeFilters,
                loadMore,
            }}
        >
            {props.children}
        </ChallengeListContext.Provider>
    );
}

function useChallengeList() {
    const context = useContext(ChallengeListContext);

    if (!context) {
        throw new Error(
            "useChallengeList must be used within a ChallengeListProvider"
        );
    }

    return context;
}

export { ChallengeListContext, ChallengeListProvider, useChallengeList };
export type { ChallengeListValue, Difficulty };
