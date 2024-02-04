import { TextField, Button } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

import { useI18n } from "providers";
import useLogin from "./useLogin";

import styles from "./styles.module.scss";

function Login() {
    const { email, setEmail, password, setPassword, handleLogin } = useLogin();
    const { translate } = useI18n();

    return (
        <div className={styles.Login}>
            <div className={styles.LoginHeader}>
                <div className={styles.LoginIcon}>
                    <LockOutlinedIcon />
                </div>

                <p>{translate("Entrar")}</p>

                <div className={styles.LoginForm}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        label={translate("Endereço de Email")}
                        placeholder={translate("exemplo@gmail.com")}
                        onChange={(evt) => setEmail(evt.target.value)}
                        value={email}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label={translate("Senha")}
                        placeholder={translate("senha123")}
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password}
                    />
                    <Button
                        fullWidth
                        onClick={handleLogin}
                    >
                        {translate("Entrar")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
export { Login };
