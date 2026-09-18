import {
    Clock,
    CalendarClock,
    Briefcase,
    Coffee,
    CheckCircle2,
    LogOut,
    Wallet,
    Calendar,
    RefreshCw
} from 'lucide-react';
import CardBox from 'src/components/shared/CardBox';
import { Button } from 'src/components/ui/button';
import { Link } from 'react-router-dom';
import { useDashboard } from './useDashboard';
import Spinner from 'src/views/admin/spinner/Spinner';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

const EmployeeDashboard = () => {
    const { t } = useTranslation('common');
    const {
        myData,
        isFetching,
        time,
        lastLogin, leaveRequest, payroll,
        loadData
    } = useDashboard()

    useEffect(() => {
        console.log(`checkIn: ${lastLogin}`)
    }, [])

    if (isFetching && !myData) {
        return <Spinner />
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('greeting')}, {myData?.fullName}! ☀️
                    </h1>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="bg-white dark:bg-gray-900 shadow-sm border-gray-200"
                        onClick={loadData}
                        disabled={isFetching}
                    >
                        <RefreshCw className={`size-4 mr-2 ${isFetching ? 'animate-spin text-primary' : 'text-gray-500'}`} />
                        Refresh
                    </Button>

                    <Button variant="outline" className="bg-white dark:bg-gray-900 shadow-sm border-gray-200 text-primary" asChild>
                        <Link to="/employee/leave-requests/new">+ Request Leave</Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardBox className={`p-5 flex flex-col items-center justify-center text-center gap-2 border-b-4 transition-colors ${time.checkIn
                    ? 'border-b-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
                    : 'border-b-red-500 bg-red-50/30 dark:bg-red-900/10'
                    }`}>
                    <div className={`p-3 rounded-full mb-1 ${time.checkIn
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-red-100 text-red-600'
                        }`}>
                        {time.checkIn ? <CheckCircle2 className="size-6" /> : <Clock className="size-6" />}
                    </div>
                    <div>
                        <p className={`text-sm font-bold uppercase tracking-wider text-[11px] ${time.checkIn ? 'text-emerald-600/80' : 'text-red-600/80'
                            }`}>
                            Today's Status
                        </p>
                        <p className={`text-xl font-black mt-0.5 ${time.checkIn ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                            {time.checkIn ? 'Checked In' : 'Not Checked In'}
                        </p>
                        {time.checkIn && (
                            <p className="text-xs font-medium text-emerald-600/70 mt-1">
                                at {formatTime(time.checkIn.toString())}
                            </p>
                        )}
                    </div>
                </CardBox>
                <CardBox className="p-5 flex flex-col items-center justify-center text-center gap-2 border-b-4 border-b-amber-500">
                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-full mb-1">
                        <CalendarClock className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
                        <div className="flex justify-center items-baseline gap-1.5 mt-0.5">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white"></p>
                            <span className="text-sm font-normal text-gray-400">{leaveRequest.length} requests</span>
                        </div>
                    </div>
                </CardBox>
                <CardBox className="p-5 flex flex-col items-center justify-center text-center gap-2 border-b-4 border-b-primary">
                    <div className="p-3 bg-primary/10 text-primary rounded-full mb-1">
                        <Briefcase className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Days Worked (Sep)</p>
                        <div className="flex justify-center items-baseline gap-1.5 mt-0.5">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white"></p>
                            <span className="text-sm font-normal text-gray-400">{payroll?.actualWorkDays} days</span>
                        </div>
                    </div>
                </CardBox>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <CardBox className="lg:col-span-2 flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Today's Schedule</h2>
                    </div>

                    <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                        {!lastLogin ? (
                            <div className="text-gray-500">No Data</div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 w-full max-w-md shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Assigned Shift</h3>
                                <p className="text-xl font-bold text-gray-900 dark:text-white mb-8">

                                </p>

                                <div className="flex justify-between items-center relative">
                                    <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>

                                    <div className="relative z-10 flex flex-col items-center bg-gray-50 dark:bg-gray-800/50 px-2">
                                        <div className={`size-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-sm ${time.lastCheckIn ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                            <Clock className="size-5" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white mt-3">Check In</p>

                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                                            {time.lastCheckIn ? formatTime(time.lastCheckIn?.toString()) : '--:--'}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center bg-gray-50 dark:bg-gray-800/50 px-2">
                                        <div className={`size-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-sm ${time.lastCheckOut ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                            <LogOut className="size-5" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white mt-3">Check Out</p>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                                            {time.lastCheckOut ? formatTime(time.lastCheckOut?.toString()) : '--:--'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardBox>

                <div className="space-y-6">
                    <CardBox className="p-5">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Links</h2>
                        <div className="flex flex-col gap-3">
                            <Link to="/leave-request" className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors group">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-md group-hover:bg-amber-200 transition-colors">
                                    <Coffee className="size-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">My Leave Requests</p>
                                    <p className="text-xs text-gray-500">View history & approvals</p>
                                </div>
                            </Link>

                            <Link to="/attendance" className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors group">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-md group-hover:bg-emerald-200 transition-colors">
                                    <Calendar className="size-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">Timesheet</p>
                                    <p className="text-xs text-gray-500">Check detailed attendance</p>
                                </div>
                            </Link>

                            <Link to="/payroll" className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-colors group">
                                <div className="p-2 bg-primary/10 text-primary rounded-md group-hover:bg-primary/20 transition-colors">
                                    <Wallet className="size-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">My Payslip</p>
                                    <p className="text-xs text-gray-500">View salary details</p>
                                </div>
                            </Link>
                        </div>
                    </CardBox>
                </div>

            </div>
        </div>
    );
};

export default EmployeeDashboard;