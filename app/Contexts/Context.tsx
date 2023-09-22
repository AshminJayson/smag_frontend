"use client";

import { useContext, createContext, useState, ReactNode } from "react";

export type User_T = {
    name: string;
};

export type AuthContext_T = {
    currUser: User_T | null;
    register: (username: string, password: string, isOwner: boolean) => void;
    login: (username: string, password: string, isOwner: boolean) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContext_T | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currUser, setCurrUser] = useState<User_T | null>(null);

    const register = (username: string, password: string, isOwner: boolean) => {
        console.log(username, password, isOwner);
        setCurrUser({ name: username });
    };
    const login = (username: string, password: string) => {
        console.log(username, password);
        setCurrUser({ name: username });
    };
    const logout = () => {
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
