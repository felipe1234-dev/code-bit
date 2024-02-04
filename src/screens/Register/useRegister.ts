import { useState, useMemo } from "react";

import * as Api from "api";
import { useLoader, useNavigation, useToast } from "providers";

function useRegister() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoFile, setPhotoFile] = useState<File>();

    const { navigate } = useNavigation();
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

    return {
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
        setPhotoFile,
        tmpPhotoUrl,
        handleChangePhoto,
        handleRegister,
    };
}

export default useRegister;
