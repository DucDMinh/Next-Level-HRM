import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner";
import { AttendanceData, LeaveRequest, PayrollRecord, User } from "src/interface"
import { api } from "src/lib/apiClient";

export const useDashboard = () => {

    const [myData, setMyData] = useState<User>()
    const [currentLogin, setCurrentLogin] = useState<AttendanceData>();
    const [lastLogin, setLastLogin] = useState<AttendanceData>();
    const [leaveRequest, setLeaveRequest] = useState<LeaveRequest[]>([])
    const [payroll, setPayroll] = useState<PayrollRecord>()
    const [isFetching, setIsFetching] = useState(false)

    const isToday = (dateString: string) => {
        if (!dateString) return false;
        const checkInDate = new Date(dateString);
        const today = new Date();
        return (
            checkInDate.getDate() === today.getDate() &&
            checkInDate.getMonth() === today.getMonth() &&
            checkInDate.getFullYear() === today.getFullYear()
        ) ? true : false
    };

    const fetchMyData = async () => {
        const { response, data } = await api.get(`/api/me`);
        if (!response.ok) throw new Error(data.message);
        if (data) setMyData(data);
    };

    const fetchPayroll = async () => {
        const { response, data } = await api.get(`/api/payroll`);
        if (!response.ok) throw new Error(data.message);
        if (data) setPayroll(data[0]);
    };

    const fetchLeaveRequest = async () => {
        const { response, data } = await api.get(`/api/leave-requests`);
        if (!response.ok) throw new Error(data.message);
        if (data) {
            setLeaveRequest(data.filter((req: LeaveRequest) => req.status === "pending"))
        };
    }

    const fetchMyAttendanceData = async () => {
        const { response, data } = await api.get(`/api/attendance`);
        if (!response.ok) throw new Error(data.message);

        if (data && data.length > 0) {
            const todayRecords = data.filter((record: any) => isToday(record.checkIn));

            if (todayRecords.length > 0) {
                const latestRecord = todayRecords[todayRecords.length - 1];
                setLastLogin(latestRecord);
                if (!latestRecord.checkOut) {
                    setCurrentLogin(latestRecord);
                } else {
                    setCurrentLogin(undefined);
                }
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setIsFetching(true);
            try {
                const promises = [fetchMyData(), fetchMyAttendanceData(), fetchLeaveRequest(), fetchPayroll()];
                await Promise.all(promises);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsFetching(false);
            }
        };
        loadData()
    }, [])

    const time = useMemo(() => {
        const checkIn = currentLogin?.checkIn ? new Date(currentLogin.checkIn.replace('Z', '')) : undefined;
        const checkOut = currentLogin?.checkOut ? new Date(currentLogin.checkOut.replace('Z', '')) : undefined;

        const lastCheckIn = lastLogin?.checkIn ? new Date(lastLogin.checkIn.replace('Z', '')) : undefined;
        const lastCheckOut = lastLogin?.checkOut ? new Date(lastLogin.checkOut.replace('Z', '')) : undefined;

        return { checkIn, checkOut, lastCheckIn, lastCheckOut };
    }, [currentLogin, lastLogin]);
    return {
        myData,
        isFetching,
        currentLogin,
        time,
        lastLogin,
        leaveRequest,
        payroll
    }
}