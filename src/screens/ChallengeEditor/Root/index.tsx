import { Button, Tab, Tabs } from "@mui/material";

import { format } from "i18n";
import { Instructions, Code, Tests } from "../components";
import { useEditor, useTabs } from "../contexts";
import { useI18n, useLoader, useNavigation, useToast } from "providers";
import * as Api from "api";

import styles from "./styles.module.scss";

function Root() {
    const { tab, goToTab } = useTabs();
    const { challenge, draft } = useEditor();
    const { translate } = useI18n();
    const { navigate } = useNavigation();
    const loader = useLoader();
    const toast = useToast();

    const tabList = [
        translate("Instruções"),
        translate("Código"),
        translate("Testes"),
    ];

    const handleSaveChallenge = async () => {
        const matches = challenge.code.match(/(function|const) (\w*)/);
        const functionName = matches ? matches[2] : undefined;

        if (!functionName) {
            return toast.error(
                translate("É necessário informar o nome da função")
            );
        }

        try {
            eval(challenge.code);
        } catch {
            return toast.error(translate("Código contém erros"));
        }

        try {
            eval(`${challenge.code}; ${functionName}();`);
        } catch {
            return toast.error(
                translate('"@nome" precisa ser uma função', {
                    nome: functionName,
                })
            );
        }

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
        loader.show();

        try {
            toast.success("Desafio salvo com sucesso!");
        } catch (err) {
            const error = err as Error;
            console.error(error);
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

    return (
        <div className={styles.Editor}>
            <header className={styles.EditorHeader}>
                <Tabs
                    className={styles.EditorTabs}
                    onChange={(_, newTab) => goToTab(newTab)}
                    value={tab}
                    TabIndicatorProps={{
                        className: styles.EditorTabsIndicator,
                    }}
                >
                    {tabList.map((label) => (
                        <Tab
                            key={label}
                            className={styles.EditorTabsTab}
                            label={label}
                        />
                    ))}
                </Tabs>

                <div className={styles.EditorHeaderRight}>
                    {draft?.lastSavedAt && (
                        <>{format.datetime(draft.lastSavedAt)}</>
                    )}
                    <Button onClick={handleSaveChallenge}>
                        {translate("Salvar")}
                    </Button>
                    <Button>{translate("Publicar")}</Button>
                </div>
            </header>
            <div className={styles.EditorContent}>
                {tab === 0 && <Instructions />}
                {tab === 1 && <Code />}
                {tab === 2 && <Tests />}
            </div>
        </div>
    );
}

export default Root;
