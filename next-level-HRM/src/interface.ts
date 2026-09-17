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

export interface AttendanceData {
    id: number,
    employeeId: number,
    date: string,
    checkIn: string,
    checkOut: string
}

export interface LeaveRequest {
    id: number,
    employeeId: number,
    fromDate: string,
    toDate: string,
    reason: string,
    status: string,
    createdAt: string
}

export interface PayrollSummary {
    employeeId: number,
    fullName: string,
    baseSalary: number,
    standardWorkDays: number,
    actualWorkDays: number,
    meetsRequirement: boolean,
    estimatedPay: number,
    existingRecordId: number,
    existingAdjustment: number,
    existingNote: string,
    existingActualWorkDays: number,
    existingTotalPay: number
}

export interface PayrollRecord {
    month: string,
    employeeId: number,
    actualWorkDays: number,
    adjustment: number,
    baseSalary: number,
    createdAt: string,
    id: number,
    note: string,
    standardWorkDays: number,
    totalPay: number
}