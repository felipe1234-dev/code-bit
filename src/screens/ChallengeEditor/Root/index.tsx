import { Header, Panels } from "../components/";
import styles from "./styles.module.scss";

function Root() {
    return (
        <div className={styles.ChallengeEditor}>
            <Header />
            <Panels />
        </div>
    );
}

export default Root;
