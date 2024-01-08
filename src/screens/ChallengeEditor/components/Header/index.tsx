import React from "react";
import { TextField } from "@mui/material";
import { useEditor } from "../../contexts";
import styles from "./styles.module.scss";

function Header() {
    const { challenge, handleUpdateChallenge } = useEditor();
    return (
        <div className={styles.Header}>
            <TextField
                variant="standard"
                onChange={handleUpdateChallenge("title")}
                value={challenge.title}
            />
        </div>
    );
}

export default Header;
export { Header };
