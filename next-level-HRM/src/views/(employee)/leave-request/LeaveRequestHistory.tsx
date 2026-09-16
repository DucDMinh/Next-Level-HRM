import { Badge } from 'src/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import { Clock, CheckCircle2, XCircle, Filter } from 'lucide-react';
import CardBox from "src/components/shared/CardBox"
import Spinner from 'src/views/admin/spinner/Spinner';
import { LeaveRequest } from 'src/interface';
import { useState } from 'react';

export const LeaveRequestHistory = ({ isLoading, leaveRequestData }: { isLoading: boolean, leaveRequestData: LeaveRequest[] }) => {

    const [filterStatus, setFilterStatus] = useState<string>('all');
    const filteredData = leaveRequestData.filter((request) => {
        if (filterStatus === 'all') return true;
        const currentStatus = (request.status || '').toLowerCase().trim();
        return currentStatus === filterStatus;
    });

    return (
        <div className="lg:col-span-2">
            <CardBox className="h-full">
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        History & Status
                    </h3>
                    <div className="relative w-full sm:w-48">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="block w-full appearance-none rounded-xl border-none bg-gray-50/50 py-2.5 pl-10 pr-8 text-sm font-medium text-gray-900 transition-all focus:bg-white focus:ring-2 focus:ring-primary/50 dark:bg-gray-800/50 dark:text-white outline-none cursor-pointer"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {isLoading ? <><Spinner /></> :
                    <div className="overflow-x-auto p-2 relative scrollbar-thin max-h-[400px]">
                        <Table>
                            <TableHeader>
                                <TableRow className="sticky bg-gray-50/50 dark:bg-white/5 hover:bg-transparent">
                                    <TableHead className="font-semibold">Request ID</TableHead>
                                    <TableHead className="font-semibold">Leave Period</TableHead>
                                    <TableHead className="font-semibold min-w-[200px]">Reason</TableHead>
                                    <TableHead className="font-semibold text-left">Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {[...filteredData].reverse().map((request) => {
                                    const currentStatus = (request.status || '').toLowerCase().trim();

                                    return (
                                        <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <TableCell className="font-medium text-gray-900 dark:text-white">
                                                <div className="flex flex-col">
                                                    <span>{request.id}</span>
                                                    <span className="text-[11px] text-gray-400 font-normal">{request.createdAt || '--'}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-gray-600 dark:text-gray-300 text-sm">
                                                <div className="flex flex-col">
                                                    <span>From: <span className="font-medium">{request.fromDate || '--'}</span></span>
                                                    <span>To: <span className="font-medium ml-4.5">{request.toDate || '--'}</span></span>
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
                                                    ${currentStatus === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                                                            : currentStatus === 'approved'
                                                                ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                                                : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                                        }`}>
                                                    {currentStatus === 'pending' && <Clock className="size-3.5" />}
                                                    {currentStatus === 'approved' && <CheckCircle2 className="size-3.5" />}
                                                    {currentStatus === 'rejected' && <XCircle className="size-3.5" />}

                                                    <span className="capitalize">
                                                        {currentStatus || 'Unknown'}
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {filteredData.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                            No requests found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                }
            </CardBox>
        </div>
    )
}