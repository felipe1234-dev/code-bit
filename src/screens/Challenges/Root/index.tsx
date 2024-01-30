import { Filters, List } from "../components";
import styles from "./styles.module.scss";

function Root() {
    return (
        <div className={styles.Root}>
            <Filters />
            <List />
        </div>
    );
}

export default Root;
