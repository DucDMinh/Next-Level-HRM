import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Clock, CalendarDays, LogIn, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import CardBox from "src/components/shared/CardBox"
import { useEffect, useMemo, useState } from 'react';
import { AttendanceData } from 'src/interface';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import { useTranslation } from 'react-i18next';

export const AttendanceStatus = ({ currentLogin, setCurrentLogin, setAttendanceData }: {
    currentLogin?: AttendanceData,
    setCurrentLogin: React.Dispatch<React.SetStateAction<AttendanceData | undefined>>,
    setAttendanceData: React.Dispatch<React.SetStateAction<AttendanceData[]>>
}) => {
    const { t } = useTranslation('client/attendance/attendance');
    const [isChecking, setIsChecking] = useState(false);
    const getAdjustedTime = () => {
        return new Date(Date.now() - 7 * 60 * 60 * 1000);
    };
    const [currentTime, setCurrentTime] = useState(getAdjustedTime());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getAdjustedTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const checkIn = useMemo(() => {
        return currentLogin?.checkIn ? new Date(currentLogin.checkIn.replace('Z', '')) : undefined;
    }, [currentLogin]);

    const formatDay = (date: Date) => {
        const days = ['day_sunday', 'day_monday', 'day_tuesday', 'day_wednesday', 'day_thursday', 'day_friday', 'day_saturday'];
        const dayName = t(days[date.getDay()]);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${dayName}, ${month}/${day}/${year}`;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const handleCheckOut = async () => {
        try {
            setIsChecking(true)
            const { response, data } = await api.post('/api/attendance/check-out')
            if (!response.ok) {
                toast.error(data.message)
                return
            }
            if (currentLogin) {
                handleUpdateCheckOutById(currentLogin.id, 'checkOut', data.checkOut)
            }
            setCurrentLogin(undefined)
            setIsChecking(false)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsChecking(false)
        }
    }

    const handleCheckIn = async () => {
        try {
            setIsChecking(true)
            const { response, data } = await api.post('/api/attendance/check-in')
            if (!response.ok) {
                toast.error(data.message)
                return
            }
            setCurrentLogin(data)
            setAttendanceData(prev => [data, ...prev])
            setIsChecking(false)
        } catch (error: any) {

        } finally {
            setIsChecking(false)
        }
    }

    const handleUpdateCheckOutById = (recordId: number, key: string, value: string) => {
        setAttendanceData(prevData => {
            return prevData.map(item => {
                if (item.id === recordId) {
                    return { ...item, [key]: value };
                }
                return item;
            });
        });
    };

    return (
        <CardBox>
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {t('title_today_attendance')}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <CalendarDays className="size-5" />
                            <span className="font-medium text-sm">{formatDay(currentTime)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <Clock className="size-5" />
                            <span className="font-medium text-sm">{formatTime(currentTime)}</span>
                        </div>
                    </div>

                    <div className="mt-3">
                        {currentLogin ? (
                            <Badge className="bg-green-100 text-green-700 px-3 py-1 flex items-center gap-1.5">
                                <CheckCircle2 className="size-4" />
                                {t('badge_clocked_in', { time: formatTime(checkIn ? checkIn : currentTime) })}
                            </Badge>
                        ) : (
                            <Badge className="bg-gray-100 text-gray-700 px-3 py-1 flex items-center gap-1.5">
                                <AlertCircle className="size-4" />
                                {t('badge_not_clocked_in')}
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    {!currentLogin ? (
                        <Button
                            onClick={() => {
                                handleCheckIn()
                            }}
                            disabled={isChecking}
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 transition-all"
                        >
                            {isChecking ? <>{t('loading')}</> : <><LogIn className="size-6" />{t('btn_check_in')}</>}

                        </Button>
                    ) : (
                        <Button
                            onClick={() => { handleCheckOut() }}
                            size="lg"
                            disabled={isChecking}
                            variant="destructive"
                            className="rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-red-500/30 flex items-center gap-2 transition-all"
                        >
                            {isChecking ? <>{t('loading')}</> : <><LogOut className="size-6" />{t('btn_check_out')}</>}
                        </Button>
                    )}
                </div>
            </div>
        </CardBox>
    )
}