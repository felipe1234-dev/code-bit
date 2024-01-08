import React, { createContext, useContext, useState } from "react";
import { Challenge } from "api/models";

interface EditorValue {
    challenge: Challenge;
    updateChallenge: (updates: Partial<Challenge>) => void;
    handleUpdateChallenge: (
        prop: keyof Challenge
    ) => (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorContext = createContext<EditorValue | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const [challenge, setChallenge] = useState(new Challenge());

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

    return (
        <EditorContext.Provider
            value={{
                challenge,
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
