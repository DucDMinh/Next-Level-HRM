'use client';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import { CalendarDays, Send, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';
import CardBox from "src/components/shared/CardBox"

const mockLeaveHistory = [
    {
        id: 'REQ-003',
        createdAt: '10/09/2026',
        startDate: '15/09/2026',
        endDate: '16/09/2026',
        duration: '2 ngày',
        reason: 'Có việc gia đình đột xuất ở quê',
        status: 'Chờ duyệt',
    },
    {
        id: 'REQ-002',
        createdAt: '01/08/2026',
        startDate: '05/08/2026',
        endDate: '05/08/2026',
        duration: '1 ngày',
        reason: 'Khám sức khỏe định kỳ',
        status: 'Đã duyệt',
    },
    {
        id: 'REQ-001',
        createdAt: '15/07/2026',
        startDate: '20/07/2026',
        endDate: '22/07/2026',
        duration: '3 ngày',
        reason: 'Đi du lịch cùng nhóm bạn bè',
        status: 'Từ chối',
    },
];

const LeaveRequest = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <CardBox className="h-full">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                <FileText className="size-5" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Tạo đơn nghỉ phép
                            </h2>
                        </div>

                        <form className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="startDate" className="text-gray-600 dark:text-gray-300">
                                        Từ ngày <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="startDate"
                                            type="date"
                                            className="w-full pl-10 h-11 rounded-lg"
                                        />
                                        <CalendarDays className="size-4 absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="endDate" className="text-gray-600 dark:text-gray-300">
                                        Đến ngày <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="endDate"
                                            type="date"
                                            className="w-full pl-10 h-11 rounded-lg"
                                        />
                                        <CalendarDays className="size-4 absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="reason" className="text-gray-600 dark:text-gray-300">
                                    Lý do xin nghỉ <span className="text-red-500">*</span>
                                </Label>
                                <textarea
                                    id="reason"
                                    rows={4}
                                    placeholder="Vui lòng nhập chi tiết lý do xin nghỉ..."
                                    className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-gray-800 dark:text-white placeholder:text-gray-400"
                                ></textarea>
                            </div>
                            <Button
                                type="button"
                                className="w-full h-12 mt-2 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                                <Send className="size-4" />
                                Gửi đơn xin nghỉ
                            </Button>
                        </form>
                    </div>
                </CardBox>
            </div>
            <div className="lg:col-span-2">
                <CardBox className="h-full">
                    <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Lịch sử & Trạng thái đơn
                        </h3>
                    </div>

                    <div className="overflow-x-auto p-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50 dark:bg-white/5 hover:bg-transparent">
                                    <TableHead className="font-semibold">Mã đơn</TableHead>
                                    <TableHead className="font-semibold">Thời gian nghỉ</TableHead>
                                    <TableHead className="font-semibold">Số ngày</TableHead>
                                    <TableHead className="font-semibold min-w-[200px]">Lý do</TableHead>
                                    <TableHead className="font-semibold text-right">Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {mockLeaveHistory.map((request) => (
                                    <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">

                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            <div className="flex flex-col">
                                                <span>{request.id}</span>
                                                <span className="text-[11px] text-gray-400 font-normal">Nộp: {request.createdAt}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-gray-600 dark:text-gray-300 text-sm">
                                            <div className="flex flex-col">
                                                <span>Từ: <span className="font-medium">{request.startDate}</span></span>
                                                <span>Đến: <span className="font-medium">{request.endDate}</span></span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-gray-600 dark:text-gray-300 font-medium">
                                            {request.duration}
                                        </TableCell>

                                        <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                                            <p className="line-clamp-2 max-w-[250px]" title={request.reason}>
                                                {request.reason}
                                            </p>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Badge
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5
                          ${request.status === 'Chờ duyệt'
                                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                                                        : request.status === 'Đã duyệt'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                                    }
                        `}
                                            >
                                                {request.status === 'Chờ duyệt' && <Clock className="size-3.5" />}
                                                {request.status === 'Đã duyệt' && <CheckCircle2 className="size-3.5" />}
                                                {request.status === 'Từ chối' && <XCircle className="size-3.5" />}
                                                {request.status}
                                            </Badge>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardBox>
            </div>

        </div>
    );
};

export default LeaveRequest;