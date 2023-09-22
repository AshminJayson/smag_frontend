"use client";

import { API, routes } from "@/components/fetching";
import { useContext, createContext, useState, ReactNode } from "react";

export type User_T = {
    name: string;
};

export type AuthContext_T = {
    currUser: User_T | null;
    register: (
        username: string,
        password: string,
        isOwner: boolean
    ) => Promise<any>;
    login: (username: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext_T | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currUser, setCurrUser] = useState<User_T | null>(null);

    const register = async (
        username: string,
        password: string,
        isOwner: boolean
    ) => {
        const res = await API.post(routes.registerUser, {
            username: username,
            password: password,
            isOwner: isOwner,
        });
        setCurrUser({ name: username });
        return res;
    };
    const login = async (username: string, password: string) => {
        const res = await API.post(routes.loginUser, {
            username: username,
            password: password,
        });
        setCurrUser({ name: username });
        if (res.data.message === "login successful") return res;
        else throw new Error(res.data.message);
    };

    const logout = async () => {
        console.log(`${currUser!.name} logged out`);
        setCurrUser(null);
    };

    return (
        <AuthContext.Provider value={{ currUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
