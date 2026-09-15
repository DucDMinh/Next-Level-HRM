/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { User } from "src/interface";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("userData");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("userData", JSON.stringify(userData));
        document.cookie = `accessToken=${newToken}; path=/; max-age=604800; SameSite=Lax`;
    };
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
    }
    return context;
};