import { TextField } from "@mui/material";
import ChipInput from "material-ui-chip-input";

import { TextEditor } from "components";
import { useI18n } from "providers";
import { useEditor } from "../../contexts";

import styles from "./styles.module.scss";

function Instructions() {
    const { translate } = useI18n();
    const { challenge, handleUpdateChallenge, updateChallenge } = useEditor();

    const handleUpdateDescription = (text: string) => {
        updateChallenge({ description: text });
    };

    const handleAddCategory = (chip: string) => {
        updateChallenge({
            categories: Array.from(new Set([...challenge.categories, chip])),
        });
    };

    const handleDeleteCategory = (chip: string) => {
        updateChallenge({
            categories: challenge.categories.filter(
                (category) => category !== chip
            ),
        });
    };

    return (
        <div className={styles.Instructions}>
            <TextField
                fullWidth
                variant="standard"
                InputProps={{ className: styles.InstructionsTitle }}
                placeholder={translate("Título do desafio")}
                onChange={handleUpdateChallenge("title")}
                value={challenge.title}
            />
            <ChipInput
                variant="standard"
                className={styles.InstructionsCategories}
                placeholder={translate("Categorias")}
                onAdd={handleAddCategory}
                onDelete={handleDeleteCategory}
                value={challenge.categories}
            />
            <TextEditor
                theme="dark"
                onChange={handleUpdateDescription}
                value={challenge.description}
            />
        </div>
    );
}

export default Instructions;
export { Instructions };
