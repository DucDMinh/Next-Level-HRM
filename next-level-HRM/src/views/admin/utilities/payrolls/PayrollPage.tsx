import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import CardBox from "src/components/shared/CardBox";
import { useEffect, useState } from 'react';
import { api } from 'src/lib/apiClient';
import { toast } from 'sonner';
import { PayrollRecord, PayrollSummary } from 'src/interface';
import { PayrollToolbar } from './PayrollToolbar';
import { PayrollTabs } from './PayrollTab';
import { PayrollSummaryTable } from './PayrollSummaryTable';
import { PayrollRecordTable } from './PayrollRecordTable';
import LocalSpinner from '../../spinner/LocalSpinner';

const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '0';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
};

const PayrollPage = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [payrollPeriod, setPayrollPeriod] = useState(currentMonth);
    const [standardDay, setStandardDay] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'pending' | 'finalized'>('pending')
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
            setIsSaving(true)
            const { response, data } = await api.put(`/api/settings`, { standardWorkDays: standardDay });
            if (!response.ok) throw new Error(data.message);
            if (data) {
                setStandardDay(data.standardWorkDays);
            }
            await Promise.all([fetchSummaryData(), fetchRecordData()])

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSaving(false)
        }
    }
    const pendingList = summaryData.filter(emp => emp.existingRecordId === null);
    return (
        <>
            <CardBox className="h-full flex flex-col relative">
                {isSaving && <LocalSpinner />}
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col gap-6 bg-gray-50/30 dark:bg-gray-900/20 rounded-t-xl">
                    <PayrollToolbar
                        payrollPeriod={payrollPeriod}
                        setPayrollPeriod={setPayrollPeriod}
                        standardDay={standardDay}
                        setStandardDay={setStandardDay}
                        handleSaveSetting={handleSaveSetting}
                    />
                    <PayrollTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        pendingCount={pendingList.length}
                        finalizedCount={recordData.length}
                    />
                </div>
                <div className="p-2 relative w-full flex-1">
                    {isSaving ? (
                        <div className="h-32 flex items-center justify-center text-gray-500">Loading...</div>
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-50/50 dark:bg-white/5">
                                    <TableHead className="font-semibold">Employee</TableHead>
                                    <TableHead className="font-semibold text-center whitespace-nowrap">
                                        {activeTab === 'pending' ? 'Actual Days' : 'Finalized Days'}
                                    </TableHead>
                                    <TableHead className="font-semibold text-right">Base Salary (₫)</TableHead>
                                    <TableHead className="font-semibold text-center w-28">Bonus/Penalty</TableHead>
                                    <TableHead className="font-semibold w-1/5">Note</TableHead>
                                    <TableHead className="font-semibold text-right whitespace-nowrap">
                                        {activeTab === 'pending' ? 'Estimated (₫)' : 'Final Pay (₫)'}
                                    </TableHead>
                                    <TableHead className="font-semibold text-right w-44">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {activeTab === 'pending' && pendingList.map((emp) => {
                                    return (
                                        <PayrollSummaryTable
                                            emp={emp}
                                            formatMoney={formatMoney}
                                        />
                                    )
                                })}
                                {activeTab === 'finalized' && recordData.map((record) => {
                                    return (
                                        <PayrollRecordTable
                                            summaryData={summaryData}
                                            record={record}
                                            formatMoney={formatMoney}
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </CardBox>
        </>
    );
};

export default PayrollPage;