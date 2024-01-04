import { TextField } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useI18n } from "providers";
import styles from "./styles.module.scss";

function Login() {
    const { translate } = useI18n();

    return (
        <div className={styles.Login}>
            <div className={styles.LoginHeader}>
                <div className={styles.LoginIcon}>
                    <LockOutlinedIcon />
                </div>

                <p>{translate("Entrar")}</p>

                <form className={styles.LoginForm}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        label={translate("Endereço de Email")}
                        placeholder={translate("exemplo@gmail.com")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label={translate("Senha")}
                        placeholder={translate("senha123")}
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
export { Login };
