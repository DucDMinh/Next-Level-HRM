export interface Employee {
    id: string,
    username: string,
    fullName: string,
    email: string,
    phone: number,
    position: string,
    department: string,
    role: string,
    joinDate: string,
    baseSalary: number
}
export interface User {
    id: string;
    username: string;
    role: string;
    token: string;
    fullName: string
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}