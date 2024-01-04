import { Button } from "@mui/material";
import { useI18n, useNavigation } from "providers";
import logo from "assets/images/logo.svg";
import styles from "./styles.module.scss";

function Welcome() {
    const { navigate } = useNavigation();
    const { translate } = useI18n();

    return (
        <div className={styles.Welcome}>
            <div className={styles.WelcomeHeader}>
                <img
                    className={styles.WelcomeLogo}
                    src={logo}
                    alt="logo"
                />
                <p>
                    {translate(
                        "Desafie sua mente, ganhe XP e domine a arte da programação enquanto se diverte!"
                    )}
                </p>
            </div>
            <div className={styles.WelcomeFooter}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/challenges")}
                >
                    {translate("Explorar os desafios")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/challenges/random")}
                >
                    {translate("Desafio aleatório")}
                </Button>
            </div>
        </div>
    );
}

export default Welcome;
export { Welcome };
