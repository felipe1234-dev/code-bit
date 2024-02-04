import React from "react";
import { ScienceRounded } from "@mui/icons-material";

import { useI18n } from "providers";
import { CodeEditor, Modal } from "components";
import useCreatorSolution from "./useCreatorSolution";

import styles from "./styles.module.scss";

interface CreatorSolutionProps {
    visible: boolean;
    hide: () => void;
}

function CreatorSolution(props: CreatorSolutionProps) {
    const { visible, hide } = props;
    const { translate } = useI18n();
    const { solutionCode, setSolutionCode, handleRunTests } =
        useCreatorSolution();

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
