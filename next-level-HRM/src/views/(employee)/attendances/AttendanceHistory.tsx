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

export const AttendanceHistory = ({ attendanceData }: { attendanceData: AttendanceData[] }) => {
    return (
        <CardBox>
            <div className="p-4 border-b border-gray-100 dark:border-white/10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Attendance History (This Month)
                </h3>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-white/5">
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Date</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Clock In</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Clock Out</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Total Hours</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((record) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardBox>
    )
}