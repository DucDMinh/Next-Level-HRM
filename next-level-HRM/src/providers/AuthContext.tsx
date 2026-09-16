/* eslint-disable react-hooks/set-state-in-effect */
import { User } from "src/interface";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "src/lib/apiClient";
import { toast } from "sonner";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLogging: boolean;
    isFetchingUser: boolean;
    login: ({ username, password }: { username: string, password: string }) => void;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const userUtils = {
    getAccessToken: () => localStorage.getItem("accessToken") || null,
    saveAccessToken: (token: string) => localStorage.setItem("accessToken", token),
    clearAccessToken: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogging, setLogging] = useState(false);
    const [isFetchingUser, setFetchingUser] = useState(false);
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState<string | null>(userUtils.getAccessToken());

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'userData') {
                if (e.newValue) {
                    setUser(JSON.parse(e.newValue));
                } else {
                    setUser(null);
                }
                return
            }
            window.location.href = '/';
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (token) {
            const getUserInfo = async () => {
                try {
                    setFetchingUser(true)
                    const { response, data: userData } = await api.get('/api/me');
                    if (!response.ok) {
                        toast.error(userData.message)
                        return
                    }
                    localStorage.setItem("userData", JSON.stringify(userData));
                    setUser(userData);
                } catch (error: any) {
                    alert(error.toString())
                } finally {
                    setFetchingUser(false);
                }
            }
            getUserInfo();
        }
    }, [token])


    const login = async ({ username, password }: { username: string, password: string }) => {
        try {
            setLogging(true);
            const { response, data } = await api.post('/login', { username: username, password: password })
            if (!response.ok) {
                toast.error(data.message)
            }
            setToken(data.token);
            userUtils.saveAccessToken(data.token);
        } catch (error: any) {
            toast.error(`error`, error)
        } finally {
            setLogging(false);
        }
    };

    const logout = () => {
        userUtils.clearAccessToken();
        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{ isLogging, isFetchingUser, user, token, isAuthenticated: !!token, login, logout }}>
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