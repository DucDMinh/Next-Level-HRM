import { useState, useEffect } from 'react';
import { Search, Filter, Check, X, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import CardBox from 'src/components/shared/CardBox';
import { toast } from 'sonner';
import { LeaveRequest } from 'src/interface';
import { api } from 'src/lib/apiClient';

const LeaveRequestAdmin = () => {
    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            try {
                const { response, data } = await api.get('/api/leave-requests')
                if (!response.ok) { throw new Error(data.message) }
                if (data) {
                    setRequests(data)
                }
            } catch (error: any) {
                toast.error("Lỗi khi tải dữ liệu");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, []);
    const filteredRequests = requests.filter((req) => {
        const matchesSearch = !searchQuery.trim() || req.employeeId.toString().includes(searchQuery.trim());
        const currentStatus = (req.status || '').toLowerCase().trim();
        const matchesFilter = filterStatus === 'all' || currentStatus === filterStatus;

        return matchesSearch && matchesFilter;
    });
    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            setProcessingId(id);
            const { response, data } = await api.patch(`/api/leave-requests/${id}`, {
                status: newStatus
            })
            if (!response.ok) { throw new Error(data.message) }
            if (data) {
                handleUpdateRequestById(id, 'status', data.status)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setProcessingId(null);
        }
    };
    const handleUpdateRequestById = (recordId: number, key: string, value: string) => {
        setRequests(prevData => {
            return prevData.map(item => {
                if (item.id === recordId) {
                    return { ...item, [key]: value };
                }
                return item;
            });
        });
    };

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB');

    return (
        <CardBox className="h-full">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Manage Leave Requests
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Employee ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-xl border-none bg-gray-50 py-2.5 pl-10 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/50 dark:bg-gray-800/50 dark:text-white"
                        />
                    </div>
                    <div className="relative w-full sm:w-48">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="block w-full appearance-none rounded-xl border-none bg-gray-50 py-2.5 pl-10 pr-8 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/50 dark:bg-gray-800/50 dark:text-white outline-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto p-2 relative scrollbar-thin max-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 dark:bg-white/5">
                            <TableHead className="font-semibold">ID</TableHead>
                            <TableHead className="font-semibold">Employee ID</TableHead>
                            <TableHead className="font-semibold">Leave Period</TableHead>
                            <TableHead className="font-semibold min-w-[200px]">Reason</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRequests.length > 0 ? (
                            [...filteredRequests].reverse().map((req) => {
                                const status = (req.status || '').toLowerCase().trim();
                                return (
                                    <TableRow key={req.id} className="hover:bg-gray-50 dark:hover:bg-white/5 ">
                                        <TableCell className="font-medium">#{req.id}</TableCell>
                                        <TableCell className="font-bold text-primary">EMP-{req.employeeId}</TableCell>
                                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex flex-col gap-1">
                                                <span>From: <span className="font-medium">{formatDate(req.fromDate)}</span></span>
                                                <span>To: <span className="font-medium ml-4">{formatDate(req.toDate)}</span></span>
                                                <span className="text-[11px] text-gray-400">Create: {formatDate(req.createdAt)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600 dark:text-gray-400 max-w-[150px] md:max-w-[200px] xl:max-w-[300px]">
                                            <p className="truncate" title={req.reason}>
                                                {req.reason || '--'}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5
                                                ${status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {status === 'pending' && <Clock className="size-3.5" />}
                                                {status === 'approved' && <CheckCircle2 className="size-3.5" />}
                                                {status === 'rejected' && <XCircle className="size-3.5" />}
                                                <span className="capitalize">{status}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {status === 'pending' ? (
                                                processingId === req.id ? (
                                                    <Button
                                                        disabled
                                                        size="sm"
                                                        className="h-8 px-4 rounded-lg bg-gray-100 text-gray-500 w-full sm:w-auto cursor-not-allowed"
                                                    >
                                                        <Loader2 className="size-4 mr-2 animate-spin" />
                                                        Processing...
                                                    </Button>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleUpdateStatus(req.id, 'approved')}
                                                            className="bg-green-500 hover:bg-green-600 text-white h-8 px-3 rounded-lg"
                                                        >
                                                            <Check className="size-4 mr-1" /> Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                            className="h-8 px-3 rounded-lg"
                                                        >
                                                            <X className="size-4 mr-1" /> Reject
                                                        </Button>
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Resolved</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                                    {isLoading ? 'Loading requests...' : 'No leave requests found.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardBox>
    );
};

export default LeaveRequestAdmin;