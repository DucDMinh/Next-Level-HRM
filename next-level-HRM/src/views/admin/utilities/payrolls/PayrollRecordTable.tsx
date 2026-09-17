import {
    Save,
    RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import {
    TableRow,
    TableCell
} from 'src/components/ui/table';
import { PayrollRecord, PayrollSummary } from 'src/interface';

export const PayrollRecordTable = ({
    summaryData,
    record,
    formatMoney
}: {
    summaryData: PayrollSummary[],
    record: PayrollRecord,
    formatMoney: (amount: number) => string
}) => {
    const empName = summaryData.find((emp) => emp.employeeId === record.employeeId)?.fullName
    const [adjustment, setAdjustment] = useState<number>(record.adjustment || 0);
    const [note, setNote] = useState<string>(record.note || '');
    const isShort = record.actualWorkDays < record.standardWorkDays;

    const isDeleted = !empName;
    const displayName = empName || "Deleted Employee";

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
                            ID: {record.employeeId}
                        </span>
                        {isDeleted && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-100 dark:bg-red-500/10 px-1.5 py-0.5 rounded">
                                Deleted
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
                    placeholder="± 0"
                />
            </TableCell>
            <TableCell>
                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-8 w-full text-sm px-2"
                    placeholder="Note..."
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
                        className="h-8 px-2 text-gray-600 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Save Adjustment"
                        disabled={isDeleted}
                    >
                        <Save className="size-3.5" />
                    </Button>
                    <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white h-8 px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Re-calculate based on new attendance"
                        disabled={isDeleted}
                    >
                        <RotateCcw className="size-3.5 sm:mr-1" />
                        <span className="hidden sm:inline">Re-calc</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}