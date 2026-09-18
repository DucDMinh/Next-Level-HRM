import { TableCell, TableRow } from 'src/components/ui/table';
import { PayrollSummary } from 'src/interface';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PayrollSummaryTable = ({
    emp,
    formatMoney,
    handleFinalize
}: {
    emp: PayrollSummary,
    formatMoney: (amount: number) => string,
    handleFinalize: (id: number, payload: { adjustment: number, note: string }) => void;
}) => {
    const { t } = useTranslation('admin/payroll/payroll');

    const [adjustment, setAdjustment] = useState<number>(emp.existingAdjustment || 0);
    const [note, setNote] = useState<string>(emp.existingNote || '');
    const isShort = emp.actualWorkDays < emp.standardWorkDays;

    const estimatePay = (emp: PayrollSummary) => {
        return Math.trunc(emp.baseSalary / emp.standardWorkDays * emp.actualWorkDays + adjustment)
    }

    return (
        <TableRow className="hover:bg-gray-50 dark:hover:bg-white/5 group">
            <TableCell>
                <span className="font-bold text-gray-900 truncate max-w-[120px]">{emp.fullName}</span>
            </TableCell>

            <TableCell className="text-center">
                <span className={`text-lg font-bold ${isShort ? 'text-red-500' : 'text-green-600'}`}>
                    {emp.actualWorkDays}
                </span>
            </TableCell>
            <TableCell className="text-right font-medium text-gray-600">
                {formatMoney(emp.baseSalary)}
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
                {formatMoney(estimatePay(emp))}
            </TableCell>
            <TableCell className="text-right">
                <Button
                    onClick={() => handleFinalize(emp.employeeId, { adjustment, note })}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white h-8"
                >
                    <Save className="size-4 sm:mr-1.5" /> <span className="hidden sm:inline">{t('btn_finalize')}</span>
                </Button>
            </TableCell>
        </TableRow>
    );
}