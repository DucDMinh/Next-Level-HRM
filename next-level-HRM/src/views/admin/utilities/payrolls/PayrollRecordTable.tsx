import {
    Save,
    RotateCcw,
} from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import {
    TableRow,
    TableCell
} from 'src/components/ui/table';
import { PayrollRecord, PayrollSummary } from 'src/interface';

export const PayrollRecordTable = ({ summaryData, record, formatMoney }: { summaryData: PayrollSummary[], record: PayrollRecord, formatMoney: (amount: number) => string }) => {
    const empName = summaryData.find((emp) => emp.employeeId === record.employeeId)?.fullName

    const isShort = record.actualWorkDays < record.standardWorkDays;

    return (
        <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-white/5 group">
            <TableCell>
                <span
                    className="block font-bold text-gray-900 dark:text-white truncate max-w-[120px]"
                    title={empName}
                >
                    {empName}
                </span>
                <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    ID: {record.employeeId}
                </span>
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
                    defaultValue={record.adjustment}
                    className="h-8 w-full text-right text-sm px-2"
                    type="number"
                />
            </TableCell>

            <TableCell>
                <Input
                    defaultValue={record.note}
                    className="h-8 w-full text-sm px-2"
                />
            </TableCell>

            <TableCell className="text-right font-bold text-primary text-base">
                {formatMoney(record.totalPay)}
            </TableCell>

            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-gray-600 hover:bg-primary hover:text-white"
                        title="Save Adjustment"
                    >
                        <Save className="size-3.5" />
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white h-8 px-2 transition-colors" title="Re-calculate based on new attendance">
                        <RotateCcw className="size-3.5 sm:mr-1" />
                        <span className="hidden sm:inline">Re-calc</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}