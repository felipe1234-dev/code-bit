import { useEditor } from "../../providers";

function useCode() {
    const { updateChallenge } = useEditor();

    const handleCodeChange = (code: string) => {
        updateChallenge({ code });
    };

    return { handleCodeChange };
}

export default useCode;
