import { useState, useMemo } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import { PermIdentityOutlined as UserIcon } from "@mui/icons-material";
import { useI18n, useLoader, useNavigation, useToast } from "providers";
import * as Api from "api";
import styles from "./styles.module.scss";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoFile, setPhotoFile] = useState<File>();

    const { navigate } = useNavigation();
    const { translate } = useI18n();
    const loader = useLoader();
    const toast = useToast();

    const tmpPhotoUrl = useMemo(() => {
        if (!photoFile) return "";
        return URL.createObjectURL(photoFile);
    }, [photoFile]);

    const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files || []);
        const file = files[0];
        if (!file) return;

        setPhotoFile(file);
    };

    const handleRegister = async () => {
        loader.show();

        try {
            await Api.cases.auth.registerUser(
                email,
                password,
                confirmPassword,
                {
                    firstName,
                    lastName,
                    photo: photoFile,
                }
            );

            navigate("/login");

            toast.success("Conta criada com sucesso");
        } catch (err) {
            const error = err as Error;
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

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
