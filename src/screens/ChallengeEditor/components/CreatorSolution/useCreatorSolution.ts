import { useState, useEffect } from "react";

import * as Api from "api";
import { useLoader, useToast } from "providers";
import { useEditor } from "../../providers";
import { Solution } from "api/models";

function useCreatorSolution() {
    const [solutionCode, setSolutionCode] = useState("");
    const [testResults, setTestResults] = useState<boolean[]>([]);

    const { challenge } = useEditor();
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

    return {
        solutionCode,
        setSolutionCode,
        testResults,
        setTestResults,
        handleRunTests,
    };
}

export default useCreatorSolution;
