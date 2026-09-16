import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import CardBox from "src/components/shared/CardBox"
import { AttendanceData } from 'src/interface';
import { Badge } from 'src/components/ui/badge';

export const AttendanceHistory = ({ attendanceData }: { attendanceData: AttendanceData[] }) => {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '--';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB');
    };

    const formatTime = (isoString?: string) => {
        if (!isoString) return '--:--';
        const date = new Date(isoString.replace('Z', ''));
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const calculateTotalHours = (checkIn?: string, checkOut?: string) => {
        if (!checkIn || !checkOut) return '--';
        const inTime = new Date(checkIn.replace('Z', '')).getTime();
        const outTime = new Date(checkOut.replace('Z', '')).getTime();
        const diffMs = outTime - inTime;
        if (diffMs <= 0) return '0h 0m';
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    const getStatus = (checkIn?: string, checkOut?: string) => {
        if (checkIn && checkOut) return { text: 'Completed', styles: 'bg-green-100 text-green-700' };
        if (checkIn && !checkOut) return { text: 'Missing Out', styles: 'bg-yellow-100 text-yellow-700' };
        return { text: 'Error', styles: 'bg-red-100 text-red-700' };
    };
    return (
        <CardBox>
            <div className="p-4 border-b border-gray-100 dark:border-white/10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Attendance History (This Month)
                </h3>
            </div>
            <div className="overflow-auto max-h-[400px] relative rounded-b-xl scrollbar-thin">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-0 sticky hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Employee ID
                            </TableHead>
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Date
                            </TableHead>
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Clock In
                            </TableHead>
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Clock Out
                            </TableHead>
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Total Hours
                            </TableHead>
                            <TableHead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((record) => {
                            const status = getStatus(record.checkIn, record.checkOut);

                            return (
                                <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                                    <TableCell className="font-medium text-primary">
                                        #{record.employeeId}
                                    </TableCell>

                                    <TableCell className="font-medium text-gray-900 dark:text-white">
                                        {formatDate(record.date)}
                                    </TableCell>

                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {formatTime(record.checkIn)}
                                    </TableCell>

                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {formatTime(record.checkOut)}
                                    </TableCell>

                                    <TableCell className="text-gray-800 dark:text-gray-300 font-medium">
                                        {calculateTotalHours(record.checkIn, record.checkOut)}
                                    </TableCell>

                                    <TableCell>
                                        <Badge className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${status.styles}`}>
                                            {status.text}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </CardBox>
    )
}