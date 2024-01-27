import React, { createContext, useContext, useEffect, useState } from "react";

import * as Api from "api";
import { Challenge, Draft } from "api/models";
import { useI18n, useNavigation } from "providers";
import { useAsyncEffect } from "hooks";

interface EditorValue {
    challenge: Challenge;
    draft: Draft | undefined;
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
    updateChallenge: (updates: Partial<Challenge>) => void;
    handleUpdateChallenge: (
        prop: keyof Challenge
    ) => (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorContext = createContext<EditorValue | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const { translate } = useI18n();
    const { params } = useNavigation();

    const [challenge, setChallenge] = useState(
        new Challenge({
            description: `<p><i>${translate(
                "Digite aqui as instruções do desafio"
            )}</i></p>`,
            code: `function helloWorld() {
    // ${translate("Escreva aqui o código base")}
    // ${translate("Dê um nome à função e provenha os argumentos")}
    // ${translate("Não escreva a solução do desafio aqui")}
}`,
        })
    );
    const [draft, setDraft] = useState<Draft | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);

    const updateChallenge = (updates: Partial<Challenge>) => {
        setChallenge((prev) => {
            return new Challenge({ ...prev, ...updates });
        });
    };

    const handleUpdateChallenge =
        (prop: keyof Challenge) =>
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            updateChallenge({ [prop]: evt.target.value });
        };

    useAsyncEffect(async () => {
        const { draftUid } = params;
        if (!draftUid) return;

        const draft = await Api.cases.drafts.getDraftByUid(draftUid);
        setDraft(draft);
    }, [params]);

    useEffect(() => {
        if (!draft) return;
        setChallenge(new Challenge(draft));
    }, [draft]);

    useAsyncEffect(async () => {
        const categories = await Api.cases.challenges.listCategories();
        setCategories(categories);
    }, []);

    return (
        <EditorContext.Provider
            value={{
                challenge,
                draft,
                categories,
                setCategories,
                updateChallenge,
                handleUpdateChallenge,
            }}
        >
            {props.children}
        </EditorContext.Provider>
    );
}

function useEditor() {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("useEditor must be used within a EditorProvider");
    }

    return context;
}

export { EditorContext, EditorProvider, useEditor };
export type { EditorValue };
