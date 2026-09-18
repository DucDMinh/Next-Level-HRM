import { useEffect, useState } from "react"
import { toast } from "sonner";
import { Employee, LeaveRequest, PayrollRecord } from "src/interface"
import { api } from "src/lib/apiClient";

export const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '0';
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
};

export const useDashboard = () => {

    const [employeeData, setEmployeeData] = useState<Employee[]>();
    const [leaveRequest, setLeaveRequest] = useState<LeaveRequest[]>();
    const [recordData, setRecordData] = useState<PayrollRecord[]>();
    const [isFetching, setIsFetching] = useState(false)

    const fetchEmployeeData = async () => {
        const { response, data } = await api.get(`/api/employees`);
        if (!response.ok) throw new Error(data.message);
        if (data) setEmployeeData(data);
    };

    const fetchLeaveRequest = async () => {
        const { response, data } = await api.get(`/api/leave-requests`);
        if (!response.ok) throw new Error(data.message);
        if (data) {
            const filterData = data.filter((request: any) => request.status == "pending")
            setLeaveRequest(filterData)
        };
    };

    const fetchRecordData = async () => {
        const { response, data } = await api.get(`/api/payroll`);
        if (!response.ok) throw new Error(data.message);
        if (data) setRecordData(data);
    };

    useEffect(() => {
        const loadData = async () => {
            setIsFetching(true);
            try {
                const promises = [fetchEmployeeData(), fetchLeaveRequest(), fetchRecordData()];
                await Promise.all(promises);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsFetching(false);
            }
        };
        loadData()
    }, [])

    const totalPayroll = (records?: PayrollRecord[]) => {
        if (records) {
            return records.reduce((total, pay) => total + pay.totalPay, 0);
        }
        return 0
    };

    const calculateDays = (start: string, end: string) => {
        const diffTime = new Date(end).getTime() - new Date(start).getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-GB');
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            const { response, data } = await api.patch(`/api/leave-requests/${id}`, {
                status: newStatus
            })
            if (!response.ok) { throw new Error(data.message) }
            if (data) {
                handleUpdateRequestById(id)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };
    const handleUpdateRequestById = (recordId: number) => {
        setLeaveRequest(prevData => {
            return prevData?.filter(item => {
                item.id === recordId
            });
        });
    };

    return {
        employeeData,
        leaveRequest,
        isFetching,
        recordData,
        totalPayroll,
        calculateDays,
        formatDate,
        handleUpdateStatus
    }
}