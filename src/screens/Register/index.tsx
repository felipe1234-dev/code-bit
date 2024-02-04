import { TextField, Button, Avatar } from "@mui/material";
import { PermIdentityOutlined as UserIcon } from "@mui/icons-material";

import { useI18n } from "providers";
import useRegister from "./useRegister";

import styles from "./styles.module.scss";

function Register() {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        photoFile,
        tmpPhotoUrl,
        handleChangePhoto,
        handleRegister,
    } = useRegister();
    const { translate } = useI18n();

    return (
        <div className={styles.Register}>
            <div className={styles.RegisterHeader}>
                {!tmpPhotoUrl ? (
                    <div className={styles.RegisterIcon}>
                        <UserIcon />
                    </div>
                ) : (
                    <Avatar
                        className={styles.RegisterPhoto}
                        src={tmpPhotoUrl}
                        alt={photoFile?.name}
                    />
                )}

                <p>{translate("Registrar")}</p>

                <div className={styles.RegisterForm}>
                    <div className={styles.RegisterFormRow}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label={translate("Primeiro nome")}
                            onChange={(evt) => setFirstName(evt.target.value)}
                            value={firstName}
                        />
                        <TextField
                            variant="outlined"
                            type="text"
                            label={translate("Último nome")}
                            onChange={(evt) => setLastName(evt.target.value)}
                            value={lastName}
                        />
                    </div>
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
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label={translate("Confirme a senha")}
                        placeholder={translate("senha123")}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        value={confirmPassword}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="file"
                        label={translate("Foto de perfil")}
                        onChange={handleChangePhoto}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        fullWidth
                        onClick={handleRegister}
                    >
                        {translate("Registrar")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
export { Register };
