import { useNavigation } from "providers";

function useWelcome() {
    const { navigate } = useNavigation();

    const handleGoToChallenges = () => navigate("/challenges");
    const handleGoToRandomChallenge = () => navigate("/challenges/random");

    return {
        handleGoToChallenges,
        handleGoToRandomChallenge,
    };
}

export default useWelcome;
