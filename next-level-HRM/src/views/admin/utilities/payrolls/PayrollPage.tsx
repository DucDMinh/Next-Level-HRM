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
import { useTranslation } from 'react-i18next';

const PayrollPage = () => {
    const { t } = useTranslation('admin/payroll/payroll');

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
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 dark:bg-white/5">
                            <TableHead className="font-semibold">{t('th_employee')}</TableHead>
                            <TableHead className="font-semibold text-center whitespace-nowrap">
                                {activeTab === 'pending' ? t('th_actual_days') : t('th_finalized_days')}
                            </TableHead>
                            <TableHead className="font-semibold text-right">{t('th_base_salary')}</TableHead>
                            <TableHead className="font-semibold text-center w-28">{t('th_bonus_penalty')}</TableHead>
                            <TableHead className="font-semibold w-1/5">{t('th_note')}</TableHead>
                            <TableHead className="font-semibold text-right whitespace-nowrap">
                                {activeTab === 'pending' ? t('th_estimated') : t('th_final_pay')}
                            </TableHead>
                            <TableHead className="font-semibold text-right w-44">{t('th_actions')}</TableHead>
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
            </div>
        </CardBox>
    );
};

export default PayrollPage;