import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import CardBox from "src/components/shared/CardBox";
import { PayrollToolbar } from './PayrollToolbar';
import { PayrollTabs } from './PayrollTab';
import { PayrollSummaryTable } from './PayrollSummaryTable';
import { PayrollRecordTable } from './PayrollRecordTable';
import LocalSpinner from '../../spinner/LocalSpinner';
import { usePayroll, formatMoney } from './usePayroll';

const PayrollPage = () => {
    const {
        payrollPeriod, setPayrollPeriod,
        standardDay, setStandardDay,
        isSaving,
        activeTab, setActiveTab,
        summaryData, recordData, pendingList,
        handleSaveSetting, handleFinalize, handleEditPayroll
    } = usePayroll();

    return (
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
                            {activeTab === 'pending' && pendingList.map((emp) => (
                                <PayrollSummaryTable
                                    key={emp.employeeId}
                                    emp={emp}
                                    formatMoney={formatMoney}
                                    handleFinalize={handleFinalize}
                                />
                            ))}
                            {activeTab === 'finalized' && recordData.map((record) => (
                                <PayrollRecordTable
                                    key={record.id}
                                    summaryData={summaryData}
                                    record={record}
                                    formatMoney={formatMoney}
                                    handleEditPayroll={handleEditPayroll}
                                    handleFinalize={handleFinalize}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </CardBox>
    );
};

export default PayrollPage;