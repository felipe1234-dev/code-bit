import { useState } from "react";
import {
    useAuth,
    useLoader,
    useNavigation,
    useToast,
} from "providers";

function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { navigate } = useNavigation();
    const { login } = useAuth();
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

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    };
}

export default useLogin;
