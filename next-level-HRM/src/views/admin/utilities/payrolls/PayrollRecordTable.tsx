import { Save, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { TableRow, TableCell } from 'src/components/ui/table';
import { PayrollRecord, PayrollSummary } from 'src/interface';
import { useTranslation } from 'react-i18next';

export const PayrollRecordTable = ({
    summaryData,
    record,
    formatMoney,
    handleEditPayroll,
    handleFinalize
}: {
    summaryData: PayrollSummary[],
    record: PayrollRecord,
    formatMoney: (amount: number) => string,
    handleEditPayroll: (recordId: number, payload: { adjustment: number, note: string }) => void,
    handleFinalize: (employeeId: number, payload: { adjustment: number, note: string }) => void
}) => {
    const { t } = useTranslation('admin/payroll/payroll');

    const empName = summaryData.find((emp) => emp.employeeId === record.employeeId)?.fullName
    const [adjustment, setAdjustment] = useState<number>(record.adjustment || 0);
    const [note, setNote] = useState<string>(record.note || '');
    const isShort = record.actualWorkDays < record.standardWorkDays;

    const isDeleted = !empName;
    const displayName = empName || t('deleted_employee');

    return (
        <TableRow
            key={record.id}
            className={`group transition-all ${isDeleted
                ? 'opacity-60 grayscale bg-gray-100/50 dark:bg-gray-900/50'
                : 'hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
        >
            <TableCell>
                <div className="flex flex-col">
                    <span
                        className={`block font-bold truncate max-w-[120px] ${isDeleted ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}
                        title={displayName}
                    >
                        {displayName}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="block text-xs text-gray-400 dark:text-gray-500">
                            {t('id_prefix')}{record.employeeId}
                        </span>
                        {isDeleted && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-100 dark:bg-red-500/10 px-1.5 py-0.5 rounded">
                                {t('badge_deleted')}
                            </span>
                        )}
                    </div>
                </div>
            </TableCell>

            <TableCell className="text-center">
                <div className="flex flex-col items-center">
                    <span
                        className={`text-lg font-bold ${isShort ? 'text-red-500' : 'text-green-600'}`}
                        title={record.standardWorkDays.toString()}
                    >
                        {record.actualWorkDays}
                    </span>
                </div>
            </TableCell>

            <TableCell className="text-right font-medium text-gray-600">
                {formatMoney(record.baseSalary)}
            </TableCell>

            <TableCell>
                <Input
                    type="number"
                    value={adjustment || ''}
                    onChange={(e) => setAdjustment(Number(e.target.value))}
                    className="h-8 w-full text-right text-sm px-2"
                    placeholder={t('placeholder_adjustment')}
                />
            </TableCell>
            <TableCell>
                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-8 w-full text-sm px-2"
                    placeholder={t('placeholder_note')}
                />
            </TableCell>

            <TableCell className="text-right font-bold text-primary text-base">
                {formatMoney(record.totalPay)}
            </TableCell>

            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                    <Button
                        onClick={() => { handleEditPayroll(record.id, { adjustment, note }) }}
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-gray-600 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t('title_save_adjustment')}
                        disabled={isDeleted}
                    >
                        <Save className="size-3.5" />
                    </Button>
                    <Button
                        onClick={() => { handleFinalize(record.employeeId, { adjustment, note }) }}
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white h-8 px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t('title_recalc')}
                        disabled={isDeleted}
                    >
                        <RotateCcw className="size-3.5 sm:mr-1" />
                        <span className="hidden sm:inline">{t('btn_recalc')}</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}