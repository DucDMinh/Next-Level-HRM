import { Badge } from 'src/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import CardBox from "src/components/shared/CardBox"
import Spinner from 'src/views/admin/spinner/Spinner';
import { LeaveRequest } from 'src/interface';

export const LeaveRequestHistory = ({ isLoading, leaveRequestData }: { isLoading: boolean, leaveRequestData: LeaveRequest[] }) => {
    return (
        <div className="lg:col-span-2">
            <CardBox className="h-full">
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        History & Status
                    </h3>
                </div>
                {isLoading ? <><Spinner /></> :
                    <div className="overflow-x-auto p-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50 dark:bg-white/5 hover:bg-transparent">
                                    <TableHead className="font-semibold">Request ID</TableHead>
                                    <TableHead className="font-semibold">Leave Period</TableHead>
                                    <TableHead className="font-semibold min-w-[200px]">Reason</TableHead>
                                    <TableHead className="font-semibold text-left">Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {leaveRequestData.reverse().map((request) => (
                                    <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            <div className="flex flex-col">
                                                <span>{request.id}</span>
                                                <span className="text-[11px] text-gray-400 font-normal">Filed: {request.createdAt || '--'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300 text-sm">
                                            <div className="flex flex-col">
                                                <span>From: <span className="font-medium">{request.fromDate || '--'}</span></span>
                                                <span>To: <span className="font-medium">{request.toDate || '--'}</span></span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                                            <p className="line-clamp-2 max-w-[250px]" title={request.reason}>
                                                {request.reason || 'No reason provided'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <Badge
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5
                        ${request.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                                                        : request.status === 'Approved'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                                    }
                    `}
                                            >
                                                {request.status === 'Pending' && <Clock className="size-3.5" />}
                                                {request.status === 'Approved' && <CheckCircle2 className="size-3.5" />}
                                                {request.status === 'Rejected' && <XCircle className="size-3.5" />}
                                                {request.status || 'Unknown'}
                                            </Badge>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                }

            </CardBox>
        </div>
    )
}