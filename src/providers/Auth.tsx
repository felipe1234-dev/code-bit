import React, { createContext, useContext, useEffect, useState } from "react";
import * as Api from "api";
import { useLoader } from "./Loader";
import { User } from "api/models";

interface AuthValue {
    user?: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>();
    const loader = useLoader();

    const login = async (email: string, password: string) => {
        const response = await Api.cases.auth.loginUser(email, password);
        setUser(response);
    };

    const logout = async () => {
        if (!user) return;
        await Api.cases.auth.logoutUser();
        setUser(undefined);
    };

    useEffect(() => {
        loader.show();
        Api.cases.auth.onSessionChange((user) => {
            setUser(user);
            loader.hide();
        });
    }, []);

    useEffect(() => {
        if (!user) return;
        Api.cases.users.onUserChange(user.uid, (updatedUser) => {
            if (!updatedUser) return;
            const updatedUserJson = JSON.stringify(updatedUser);
            const currentUserJson = JSON.stringify(user);
            if (updatedUserJson !== currentUserJson) setUser(updatedUser);
        });
    }, [user?.uid]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export { AuthContext, AuthProvider, useAuth };
