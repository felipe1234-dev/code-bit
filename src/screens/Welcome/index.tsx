import { Button } from "@mui/material";

import { appName } from "constants/app";
import { useI18n } from "providers";
import useWelcome from "./useWelcome";

import styles from "./styles.module.scss";

function Welcome() {
    const { handleGoToChallenges, handleGoToRandomChallenge } = useWelcome();
    const { translate } = useI18n();

    return (
        <div className={styles.Welcome}>
            <div className={styles.WelcomeHeader}>
                <h1>{appName}</h1>
                <p>
                    {translate(
                        "Desafie sua mente, ganhe XP e domine a arte da programação enquanto se diverte!"
                    )}
                </p>
            </div>
            <div className={styles.WelcomeFooter}>
                <Button
                    variant="outlined"
                    onClick={handleGoToChallenges}
                >
                    {translate("Explorar os desafios")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleGoToRandomChallenge}
                >
                    {translate("Desafio aleatório")}
                </Button>
            </div>
        </div>
    );
}

export default Welcome;
export { Welcome };
