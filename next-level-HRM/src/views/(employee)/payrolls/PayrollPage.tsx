import { useEffect, useState } from 'react';
import {
    Calendar,
    Wallet,
    TrendingUp,
    TrendingDown,
    Info,
    Receipt,
    Inbox
} from 'lucide-react';
import CardBox from 'src/components/shared/CardBox';
import { Label } from 'src/components/ui/label';
import { PayrollRecord } from 'src/interface';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import Spinner from 'src/views/admin/spinner/Spinner';
import { useTranslation } from 'react-i18next';
const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '0';
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
};

const EmployeePayrollPage = () => {
    const { t } = useTranslation('client/payroll/payroll');
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [payrollPeriod, setPayrollPeriod] = useState(currentMonth);
    const [isLoading, setIsLoading] = useState(false)
    const [payrollData, setPayrollData] = useState<PayrollRecord>();

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                setIsLoading(true)
                const { response, data } = await api.get(`/api/payroll?month=${payrollPeriod}`)
                if (!response.ok) throw new Error(data.message)
                if (data) {
                    setPayrollData(data[0])
                }
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPayrollData();
    }, [payrollPeriod])

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <CardBox className="h-full flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-950">
            <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-t-xl gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Receipt className="size-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {t('title_payslip', { month: payrollPeriod.split('-')[1], year: payrollPeriod.split('-')[0] })}
                    </h2>
                    {payrollData ? (
                        <span className="ml-2 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{t('badge_finalized')}</span>
                    ) : (
                        <span className="ml-2 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">{t('badge_pending')}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-48">
                    <Label className="text-xs text-gray-500 uppercase font-semibold">{t('label_payroll_period')}</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="month"
                            value={payrollPeriod}
                            onChange={(e) => { setPayrollPeriod(e.target.value) }}
                            className="block w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm font-medium focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>
            </div>

            {payrollData ?
                <>
                    <div className="p-6 max-w-6xl mx-auto w-full space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm">
                                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full">
                                    <Wallet className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{t('label_base_salary')}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formatMoney(payrollData.totalPay)}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm">
                                <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full">
                                    <Calendar className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{t('label_actual_standard_days')}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {payrollData.actualWorkDays} <span className="text-sm text-gray-400 font-normal">/ {payrollData.standardWorkDays}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm">
                                <div className="p-3 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-full">
                                    <TrendingDown className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{t('label_adjustments')}</p>
                                    <p className="text-lg font-bold text-orange-600">{formatMoney(payrollData.adjustment)}</p>
                                </div>
                            </div>
                            <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/20 flex items-center gap-4 shadow-sm">
                                <div className="p-3 bg-primary text-white rounded-full shadow-md shadow-primary/20">
                                    <TrendingUp className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-primary/80 font-medium uppercase tracking-wider text-[11px]">{t('label_net_pay')}</p>
                                    <p className="text-2xl font-black text-primary">{formatMoney(payrollData.baseSalary / payrollData.standardWorkDays * payrollData.actualWorkDays)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-4 bg-gray-50/80 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                    <Info className="size-4 text-gray-500" />
                                    {t('title_breakdown')}
                                </h3>
                            </div>

                            <div className="p-0">
                                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 transition-colors">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{t('row_salary_by_days')}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {t('row_salary_by_days_desc', { rate: formatMoney(Math.round(payrollData.standardWorkDays)), days: payrollData.actualWorkDays })}
                                        </p>
                                    </div>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {formatMoney(Math.round(payrollData.totalPay))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 transition-colors">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{t('row_other_adjustments')}</p>
                                        {payrollData.note && (
                                            <p className="text-xs text-gray-500 mt-0.5 italic">{t('note_prefix', { note: payrollData.note })}</p>
                                        )}
                                    </div>
                                    <span className={`font-semibold ${payrollData.adjustment < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                        {payrollData.adjustment > 0 ? '+' : ''}{formatMoney(payrollData.adjustment)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-5 bg-gray-50/50 dark:bg-black/20">
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{t('row_total_net')}</span>
                                    <span className="text-2xl font-black text-primary">
                                        {formatMoney(payrollData.totalPay)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </> :
                <div className="flex-1 flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-full mb-5 shadow-sm border border-gray-100 dark:border-gray-800">
                        <Inbox className="size-12 text-gray-400 dark:text-gray-500 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                        {t('no_data')}
                    </h3>
                </div>
            }
        </CardBox>
    );
};

export default EmployeePayrollPage;