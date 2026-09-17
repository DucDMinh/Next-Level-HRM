import { useEffect, useState } from 'react';
import { api } from 'src/lib/apiClient';
import { toast } from 'sonner';
import { PayrollRecord, PayrollSummary } from 'src/interface';

export const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '0';
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
};

export const usePayroll = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [payrollPeriod, setPayrollPeriod] = useState(currentMonth);
    const [standardDay, setStandardDay] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'pending' | 'finalized'>('pending');
    const [summaryData, setSummaryData] = useState<PayrollSummary[]>([]);
    const [recordData, setRecordData] = useState<PayrollRecord[]>([]);

    const fetchSummaryData = async () => {
        const { response, data } = await api.get(`/api/payroll/summary?month=${payrollPeriod}`);
        if (!response.ok) throw new Error(data.message);
        if (data) setSummaryData(data);
    };

    const fetchRecordData = async () => {
        const { response, data } = await api.get(`/api/payroll?month=${payrollPeriod}`);
        if (!response.ok) throw new Error(data.message);
        if (data) setRecordData(data);
    };

    const fetchStandardDay = async () => {
        const { response, data } = await api.get(`/api/settings`);
        if (!response.ok) throw new Error(data.message);
        if (data) setStandardDay(data.standardWorkDays);
    };

    useEffect(() => {
        if (!payrollPeriod) return;
        const loadData = async () => {
            setIsSaving(true);
            try {
                const promises = [fetchSummaryData(), fetchRecordData()];
                if (standardDay === null) {
                    promises.push(fetchStandardDay());
                }
                await Promise.all(promises);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsSaving(false);
            }
        };

        loadData();
    }, [payrollPeriod]);

    const handleSaveSetting = async () => {
        try {
            setIsSaving(true);
            const { response, data } = await api.put(`/api/settings`, { standardWorkDays: standardDay });
            if (!response.ok) throw new Error(data.message);
            if (data) {
                setStandardDay(data.standardWorkDays);
            }
            await Promise.all([fetchSummaryData(), fetchRecordData()]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFinalize = async (employeeId: number, payload: { adjustment: number, note: string }) => {
        try {
            setIsSaving(true);
            const { response, data } = await api.post(`/api/payroll/generate`, {
                month: payrollPeriod,
                employeeId: employeeId,
                adjustment: payload.adjustment,
                note: payload.note,
            });
            if (!response.ok) throw new Error(data.message);
            await Promise.all([fetchSummaryData(), fetchRecordData()]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const pendingList = summaryData.filter(emp => emp.existingRecordId === null);

    return {
        payrollPeriod,
        setPayrollPeriod,
        standardDay,
        setStandardDay,
        isSaving,
        activeTab,
        setActiveTab,
        summaryData,
        recordData,
        pendingList,
        handleSaveSetting,
        handleFinalize
    };
};