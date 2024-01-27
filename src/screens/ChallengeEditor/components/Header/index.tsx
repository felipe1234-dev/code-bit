import React, { useState } from "react";
import { Button } from "@mui/material";

import { format } from "i18n";
import { useEditor } from "../../providers";
import {
    useI18n,
    useLoader,
    useModal,
    useNavigation,
    useToast,
} from "providers";
import * as Api from "api";

import CreatorSolution from "../CreatorSolution";

import styles from "./styles.module.scss";

function Header() {
    const { challenge, draft } = useEditor();
    const { translate } = useI18n();
    const { navigate } = useNavigation();
    const loader = useLoader();
    const toast = useToast();

    const [showSolutionCodeModal, setShowSolutionCodeModal] = useState(false);

    const validateChallenge = () => {
        const matches = challenge.code.match(/(function|const) (\w*)/);
        const functionName = matches ? matches[2] : undefined;

        if (!functionName) {
            toast.error(translate("É necessário informar o nome da função"));

            return false;
        }

        try {
            eval(challenge.code);
        } catch {
            toast.error(translate("Código contém erros"));

            return false;
        }

        try {
            eval(`${challenge.code}; ${functionName}();`);
        } catch {
            toast.error(
                translate('"@nome" precisa ser uma função', {
                    nome: functionName,
                })
            );

            return false;
        }

        return true;
    };

    const handleSaveChallenge = async () => {
        const isValid = validateChallenge();
        if (!isValid) return;

        loader.show();

        try {
            const draft = await Api.cases.drafts.saveChallengeAsDraft(
                challenge
            );
            navigate(`/editor/${draft.uid}`);
            toast.success("Desafio salvo com sucesso!");
        } catch (err) {
            const error = err as Error;
            console.error(error);
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

    const handlePublishChallenge = async () => {
        const isValid = validateChallenge();
        if (!isValid) return;
        setShowSolutionCodeModal(true);
    };

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderLeft} />
            <div className={styles.HeaderRight}>
                {draft?.lastSavedAt && (
                    <span className={styles.HeaderLastSavedAt}>
                        {format.datetime(draft.lastSavedAt)}
                    </span>
                )}
                <Button onClick={handleSaveChallenge}>
                    {translate("Salvar")}
                </Button>
                <Button onClick={handlePublishChallenge}>
                    {translate("Publicar")}
                </Button>
            </div>
            <CreatorSolution
                visible={showSolutionCodeModal}
                hide={() => setShowSolutionCodeModal(false)}
            />
        </header>
    );
}

export default Header;
export { Header };
