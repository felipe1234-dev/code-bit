import React, { useState, useEffect } from "react";
import { ScienceRounded } from "@mui/icons-material";

import { useI18n, useLoader, useToast } from "providers";
import { useEditor } from "../../providers";
import { CodeEditor, Modal } from "components";
import { Solution } from "api/models";
import * as Api from "api";

import styles from "./styles.module.scss";

interface CreatorSolutionProps {
    visible: boolean;
    hide: () => void;
}

function CreatorSolution(props: CreatorSolutionProps) {
    const [solutionCode, setSolutionCode] = useState("");
    const [testResults, setTestResults] = useState<boolean[]>([]);

    const { visible, hide } = props;
    const { challenge } = useEditor();
    const { translate } = useI18n();
    const loader = useLoader();
    const toast = useToast();

    const handleRunTests = async () => {
        loader.show();

        try {
            const solution = new Solution({
                code: solutionCode,
                unblockedSolutions: true,
            });

            const { solved, results } =
                await Api.cases.solutions.evaluateSolution(solution, challenge);

            console.log({ solved, results });
        } catch (err) {
            const error = err as Error;
            console.error(error);
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

    useEffect(() => {
        setSolutionCode(challenge.code);
    }, [challenge.code]);

    return (
        <Modal
            visible={visible}
            hide={hide}
            title={translate("Agora, resolva o seu próprio desafio!")}
            description={
                <div className={styles.CreatorSolution}>
                    <CodeEditor
                        onChange={setSolutionCode}
                        value={solutionCode}
                    />
                </div>
            }
            buttons={[
                {
                    variant: "contained",
                    color: "success",
                    onClick: handleRunTests,
                    children: (
                        <>
                            <ScienceRounded />
                            <span>{translate("Rodar testes")}</span>
                        </>
                    ),
                },
            ]}
        />
    );
}

export default CreatorSolution;
export { CreatorSolution };
export type { CreatorSolutionProps };
