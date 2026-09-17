import {
    TableCell,
    TableRow,
} from 'src/components/ui/table';
import { PayrollSummary } from 'src/interface';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { AlertCircle, Save } from 'lucide-react';

export const PayrollSummaryTable = ({ emp, formatMoney }: { emp: PayrollSummary, formatMoney: (amount: number) => string }) => {
    const isShort = emp.actualWorkDays < emp.standardWorkDays;
    return (
        <TableRow key={emp.employeeId} className="hover:bg-gray-50 dark:hover:bg-white/5 group">
            <TableCell>
                <span
                    className="block font-bold text-gray-900 dark:text-white truncate max-w-[120px]"
                    title={emp.fullName}
                >
                    {emp.fullName}
                </span>
                <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    ID: {emp.employeeId}
                </span>
            </TableCell>
            <TableCell className="text-center">
                <div className="flex flex-col items-center">
                    <span className={`text-lg font-bold ${isShort ? 'text-red-500' : 'text-green-600'}`}>
                        {emp.actualWorkDays}
                    </span>
                    {isShort && (
                        <span className="text-[10px] text-red-500 flex items-center gap-0.5">
                            <AlertCircle className="size-3" /> Short {emp.standardWorkDays - emp.actualWorkDays}
                        </span>
                    )}
                </div>
            </TableCell>
            <TableCell className="text-right font-medium text-gray-600">{formatMoney(emp.baseSalary)}</TableCell>
            <TableCell>
                <Input className="h-8 w-full text-right text-sm px-2" placeholder="± 0" type="number" />
            </TableCell>
            <TableCell>
                <Input className="h-8 w-full text-sm px-2" placeholder="Note..." />
            </TableCell>
            <TableCell className="text-right font-bold text-primary text-base">{formatMoney(emp.estimatedPay)}</TableCell>
            <TableCell className="text-right">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white h-8 w-full sm:w-auto">
                    <Save className="size-4 sm:mr-1.5" /> <span className="hidden sm:inline">Finalize</span>
                </Button>
            </TableCell>
        </TableRow>
    );
}