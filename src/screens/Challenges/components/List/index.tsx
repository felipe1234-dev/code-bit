import React from "react";
import { useChallengeList } from "../../providers";
import styles from "./styles.module.scss";

function List() {
    const { challenges } = useChallengeList();

    return <div className={styles.List}>
        {challenges.length === 0 ? <></> : <></>}

    </div>;
}

export default List;
export { List };
