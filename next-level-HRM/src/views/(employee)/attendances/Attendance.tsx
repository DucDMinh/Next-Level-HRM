'use client';

import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import { Clock, CalendarDays, LogIn, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import CardBox from "src/components/shared/CardBox"
const mockHistory = [
    {
        id: 1,
        date: '15/09/2026',
        checkIn: '08:00 AM',
        checkOut: '05:05 PM',
        workHours: '8h 5m',
        status: 'Đúng giờ',
    },
    {
        id: 2,
        date: '14/09/2026',
        checkIn: '08:15 AM',
        checkOut: '05:30 PM',
        workHours: '8h 15m',
        status: 'Đi muộn',
    },
    {
        id: 3,
        date: '13/09/2026',
        checkIn: '07:55 AM',
        checkOut: '05:00 PM',
        workHours: '8h 5m',
        status: 'Đúng giờ',
    },
    {
        id: 4,
        date: '12/09/2026',
        checkIn: '08:00 AM',
        checkOut: '--:--',
        workHours: '--',
        status: 'Thiếu giờ ra',
    },
];

const Attendance = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <CardBox>
                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Chấm công hôm nay
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                <CalendarDays className="size-5" />
                                <span className="font-medium text-sm">Thứ Ba, 15/09/2026</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                <Clock className="size-5" />
                                <span className="font-medium text-sm">08:00 AM</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            {isCheckedIn ? (
                                <Badge className="bg-green-100 text-green-700 px-3 py-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="size-4" />
                                    Đang trong ca làm việc (Vào lúc 08:00 AM)
                                </Badge>
                            ) : (
                                <Badge className="bg-gray-100 text-gray-700 px-3 py-1 flex items-center gap-1.5">
                                    <AlertCircle className="size-4" />
                                    Bạn chưa chấm công vào ca
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        {!isCheckedIn ? (
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 transition-all"
                                onClick={() => setIsCheckedIn(true)}
                            >
                                <LogIn className="size-6" />
                                Chấm công vào
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                variant="destructive"
                                className="rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-red-500/30 flex items-center gap-2 transition-all"
                                onClick={() => setIsCheckedIn(false)}
                            >
                                <LogOut className="size-6" />
                                Chấm công ra
                            </Button>
                        )}
                    </div>

                </div>
            </CardBox>
            <CardBox>
                <div className="p-4 border-b border-gray-100 dark:border-white/10">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Lịch sử chấm công (Tháng này)
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-white/5">
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Ngày</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Giờ vào</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Giờ ra</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Tổng giờ làm</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Trạng thái</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockHistory.map((record) => (
                                <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                    <TableCell className="font-medium text-gray-900 dark:text-white">
                                        {record.date}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {record.checkIn}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {record.checkOut}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400 font-medium">
                                        {record.workHours}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                        ${record.status === 'Đúng giờ'
                                                    ? 'bg-green-100 text-green-700'
                                                    : record.status === 'Đi muộn'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }
                      `}
                                        >
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardBox>
        </div>
    );
};

export default Attendance;