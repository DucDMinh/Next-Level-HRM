import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import { AttendanceData } from 'src/interface'
import { AttendanceStatus } from './AttendanceStatus';
import { AttendanceHistory } from './AttendanceHistory';
import Spinner from 'src/views/admin/spinner/Spinner'

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
    const [currentLogin, setCurrentLogin] = useState<AttendanceData>();
    const [isLoading, setIsLoading] = useState(true);

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

    const fetchAttendanceData = async () => {
        try {
            const { response, data } = await api.get(`/api/attendance`);

            if (!response.ok) {
                toast.error(data.message);
                return;
            }
            if (data && data.length > 0) {
                for (let i = data.length - 1; i >= 0; i--) {
                    if (isToday(data[i].checkOut)) {
                        break;
                    }
                    if (isToday(data[i].checkIn)) {
                        setCurrentLogin(data[i])
                        break;
                    }
                }
            }
            setAttendanceData(data || []);

        } catch (error: any) {
            toast.error(error.toString());
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAttendanceData();
    }, [])
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-6">
            <AttendanceStatus
                currentLogin={currentLogin ?? undefined}
                setCurrentLogin={setCurrentLogin}
                attendanceData={attendanceData}
                setAttendanceData={setAttendanceData}
            />
            <AttendanceHistory
                attendanceData={attendanceData}
            />
        </div>
    );
};

export default Attendance;