import React, { createContext, useContext, useState } from "react";

import * as Api from "api";
import { Draft, Challenge, User } from "api/models";
import { FilterParams } from "types";
import { mergeListsByProp } from "utils/functions";

interface FilterHistoryItem<T> {
    uid: string;
    params: FilterParams<T>;
    date: Date;
}

interface CacheDatabase {
    drafts: Draft[];
    challenges: Challenge[];
    users: User[];
    challengeFilterHistory: FilterHistoryItem<Challenge>[];
}

interface CacheValue {
    data: CacheDatabase;
    add: {
        drafts: (drafts: Draft[]) => void;
        challenges: (challenges: Challenge[]) => void;
        users: (users: User[]) => void;
        challengeFilter: (historyItems: FilterHistoryItem<Challenge>[]) => void;
    };
}

type AdditionType = keyof CacheDatabase;
type Item = CacheDatabase[keyof CacheDatabase][number];
type Callback = (updatedItem: Item | undefined) => void;

const CacheContext = createContext<CacheValue | undefined>(undefined);

function CacheProvider(props: { children: React.ReactNode }) {
    const [data, setData] = useState<CacheDatabase>({
        drafts: [],
        challenges: [],
        users: [],
        challengeFilterHistory: [],
    });

    const addData =
        (
            type: AdditionType,
            listener?: (uid: string, callback: Callback) => void
        ) =>
        (items: Item[]) => {
            setData((prev) => ({
                ...prev,
                [type]: mergeListsByProp(prev[type], items, "uid"),
            }));

            if (!listener) return;

            for (const item of items) {
                listener(item.uid, (updatedItem) => {
                    if (!updatedItem) return;

                    setData((prev) => ({
                        ...prev,
                        [type]: prev.drafts.map((i) => {
                            return i.uid === updatedItem.uid ? updatedItem : i;
                        }),
                    }));
                });
            }
        };

    return (
        <CacheContext.Provider
            value={{
                data,
                add: {
                    drafts: addData("drafts", Api.cases.drafts.onDraftChange),
                    challenges: addData(
                        "challenges",
                        Api.cases.challenges.onChallengeChange
                    ),
                    users: addData("users", Api.cases.users.onUserChange),
                    challengeFilter: addData("challengeFilterHistory"),
                },
            }}
        >
            {props.children}
        </CacheContext.Provider>
    );
}

function useCache() {
    const context = useContext(CacheContext);
    if (!context)
        throw new Error("useCache must be used within an CacheProvider");
    return context;
}

export { CacheContext, CacheProvider, useCache };
