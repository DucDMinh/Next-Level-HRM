import {
    Users,
    CalendarClock,
    UserCheck,
    Wallet,
    ChevronRight,
    Check,
    X
} from 'lucide-react';
import CardBox from 'src/components/shared/CardBox';
import { Button } from 'src/components/ui/button';
import { Link } from 'react-router-dom';
import { formatMoney, useDashboard } from './useDashboard';
import Spinner from '../spinner/Spinner';

const AdminDashboard = () => {

    const {
        employeeData,
        leaveRequest,
        isFetching,
        recordData,
        totalPayroll,
        calculateDays,
        formatDate, handleUpdateStatus } = useDashboard()

    if (isFetching) {
        return (
            <Spinner />
        )
    }
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome back, Manager! 👋
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Today is Friday, September 18, 2026.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardBox className="p-5 flex flex-col items-center justify-center text-center gap-2 border-b-4 border-b-blue-500">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full mb-1">
                        <Users className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Employees</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{employeeData?.length}</p>
                    </div>
                </CardBox>
                <CardBox className="p-5 flex flex-col items-center justify-center text-center gap-2 border-b-4 border-b-amber-500 bg-amber-50/30 dark:bg-amber-900/10">
                    <div className="p-3 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-full mb-1">
                        <CalendarClock className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-amber-600/80 font-bold uppercase tracking-wider text-[11px]">Action Needed</p>
                        <div className="flex justify-center items-baseline gap-1.5">
                            <p className="text-2xl font-black text-amber-600">{leaveRequest?.length}</p>
                            <span className="text-sm font-medium text-amber-600/80">requests</span>
                        </div>
                    </div>
                </CardBox>
                <CardBox className="p-5 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 bg-primary/10 text-primary rounded-full mb-1">
                        <Wallet className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Estimated Payroll</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatMoney(totalPayroll(recordData))} <span className="text-sm font-normal text-gray-400">₫</span>
                        </p>
                    </div>
                </CardBox>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CardBox className="lg:col-span-2 flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Pending Leave Requests</h2>
                        <Link to="/admin/utilities/leave-requests" className="text-sm text-primary hover:underline flex items-center font-medium">
                            View All <ChevronRight className="size-4 ml-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 p-0">
                        {leaveRequest?.map((req, index) => (
                            <div key={req.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${index !== leaveRequest.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                        #{req.employeeId}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <p className="font-bold text-gray-900 dark:text-white leading-none">
                                            Employee #{req.employeeId}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs mt-1.5">
                                            <span
                                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded font-medium max-w-[150px] truncate"
                                                title={req.reason}
                                            >
                                                {req.reason}
                                            </span>
                                            <span className="text-gray-400">
                                                • {calculateDays(req.fromDate, req.toDate)} days ({formatDate(req.fromDate)} - {formatDate(req.toDate)})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        onClick={() => { handleUpdateStatus(req.id, 'approved') }}
                                        size="icon"
                                        variant="outline"
                                        className="size-8 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 bg-white" title="Approve">
                                        <Check className="size-4" />
                                    </Button>
                                    <Button
                                        onClick={() => { handleUpdateStatus(req.id, 'rejected') }}
                                        size="icon"
                                        variant="outline"
                                        className="size-8 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 bg-white" title="Reject">
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBox>
                <div className="space-y-6">
                    <CardBox className="p-5">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Access</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/admin/utilities/employee" className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:border-primary/30 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-center group">
                                <Users className="size-5 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary">Employee List</span>
                            </Link>
                            <Link to="/admin/utilities/attendances" className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:border-primary/30 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-center group">
                                <UserCheck className="size-5 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary">Timesheet</span>
                            </Link>
                            <Link to="/admin/utilities/payrolls" className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:border-primary/30 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-center group col-span-2">
                                <Wallet className="size-5 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary">Finalize Payroll (Month {new Date().getMonth() + 1})</span>
                            </Link>
                        </div>
                    </CardBox>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;