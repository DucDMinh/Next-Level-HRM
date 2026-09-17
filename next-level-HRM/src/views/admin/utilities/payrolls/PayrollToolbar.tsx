import { Label } from 'src/components/ui/label';
import {
    Calendar,
    Settings
} from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

interface HeaderToolbarProp {
    payrollPeriod: string,
    setPayrollPeriod: React.Dispatch<React.SetStateAction<string>>,
    standardDay: number | null;
    setStandardDay: (val: number) => void;
    handleSaveSetting: () => void,
}

export const PayrollToolbar = ({ payrollPeriod, setPayrollPeriod, standardDay, setStandardDay, handleSaveSetting }: HeaderToolbarProp) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1.5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Payroll Summary</h2>
                <p className="text-sm text-gray-500">Manage and finalize monthly employee payroll</p>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex flex-col gap-2 w-full sm:w-48">
                    <Label className="text-xs text-gray-500 uppercase font-semibold">Payroll Period</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="month"
                            value={payrollPeriod}
                            onChange={(e) => setPayrollPeriod(e.target.value)}
                            className="block w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm font-medium focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-40">
                    <Label className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
                        <Settings className="size-3" /> Standard Days
                    </Label>
                    <Input
                        type="number"
                        value={standardDay || 26}
                        onChange={(e) => setStandardDay(parseInt(e.target.value))}
                        className="rounded-xl border-gray-200 font-bold text-center"
                    />
                </div>
                <Button
                    onClick={() => {
                        handleSaveSetting();
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}