import { useState, useEffect } from "react";

import { useEditor } from "../../providers";
import { CodeEditor } from "components";
import { useI18n } from "providers";

import styles from "./styles.module.scss";

function Tests() {
    const { challenge, updateChallenge } = useEditor();
    const { translate } = useI18n();
    const [code, setCode] = useState("");

    const handleCodeChange = (value: string) => {
        setCode(value);

        const matches = value.match(/const tests = \[[\S\s]*\];/);
        if (!matches) return;

        const str = matches[0].replace("const tests = [", "").replace("];", "");
        const isNotComment = (str: string) => !/^\/\/.*$/.test(str);
        const tests = str
            .split("\n")
            .map((test) => test.trim().replace(/\t/g, "").replace(/,$/, ""))
            .filter(isNotComment)
            .filter(Boolean);

        updateChallenge({ tests });
    };

    useEffect(() => {
        if (challenge.tests.length > 0) {
            setCode(`const tests = [
    ${
        challenge.tests.length === 0
            ? `
    // ${translate("Coloque os testes aqui. Ex: soma(1, 1) === 2")}
    // ${translate("Não crie variáveis externas")}
    // ${translate(
        "Essa array será utilizada para testar a solução dos participantes"
    )}`
            : challenge.tests.join(",\n")
    }
];`);
        }
    }, [challenge.uid]);

    return (
        <div className={styles.Tests}>
            <CodeEditor
                onChange={handleCodeChange}
                value={code}
            />
        </div>
    );
}

export default Tests;
export { Tests };
