import { LeaveRequest } from 'src/interface';
import { useEffect, useState } from 'react';
import { api } from 'src/lib/apiClient';
import { toast } from 'sonner';
import { CreateLeaveRequestForm } from './CreateLeaveRequestForm';
import { LeaveRequestHistory } from './LeaveRequestHistory';

const LeaveRequestPage = () => {
    const [leaveRequestData, setLeaveRequestData] = useState<LeaveRequest[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchLeaveRequestData = async () => {
        try {
            setIsLoading(true)
            const { response, data } = await api.get('/api/leave-requests')
            if (!response.ok) throw new Error(data.message);
            if (data) {
                setLeaveRequestData(data)
                setIsLoading(false)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchLeaveRequestData()
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CreateLeaveRequestForm
                leaveRequestData={leaveRequestData}
                setLeaveRequestData={setLeaveRequestData}
            />
            <LeaveRequestHistory
                isLoading={isLoading}
                leaveRequestData={leaveRequestData}
            />
        </div>
    );
};

export default LeaveRequestPage;