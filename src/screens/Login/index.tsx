import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useAuth, useI18n, useLoader, useNavigation, useToast } from "providers";
import styles from "./styles.module.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { navigate } = useNavigation();
    const { login } = useAuth();
    const { translate } = useI18n();
    const loader = useLoader();
    const toast = useToast();

    const handleLogin = async () => {
        loader.show();

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            const error = err as Error;
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

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
                        onChange={evt => setEmail(evt.target.value)}
                        value={email}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label={translate("Senha")}
                        placeholder={translate("senha123")}
                        onChange={evt => setPassword(evt.target.value)}
                        value={password}
                    />
                    <Button fullWidth onClick={handleLogin}>
                        {translate("Entrar")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
export { Login };
