import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Check, X, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { TableCell, TableRow } from 'src/components/ui/table';
import { LeaveRequest } from 'src/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import { useTranslation } from 'react-i18next';

export const LeaveRequestTableData = ({ req, setRequests }: { req: LeaveRequest, setRequests: Dispatch<SetStateAction<LeaveRequest[]>> }) => {
    const { t } = useTranslation('admin/leave-request/leave-request');

    const [processingId, setProcessingId] = useState<number | null>(null);
    const status = (req.status || '').toLowerCase().trim();
    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB');

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

    return (
        <TableRow className="hover:bg-gray-50 dark:hover:bg-white/5 ">
            <TableCell className="font-medium">#{req.id}</TableCell>
            <TableCell className="font-bold text-primary">{t('emp_prefix', { id: req.employeeId })}</TableCell>
            <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                <div className="flex flex-col gap-1">
                    <span>{t('label_from')}<span className="font-medium ml-6">{formatDate(req.fromDate)}</span></span>
                    <span>{t('label_to')}<span className="font-medium ml-4">{formatDate(req.toDate)}</span></span>
                    <span className="text-[11px] text-gray-400">{t('label_create')}{formatDate(req.createdAt)}</span>
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
                    <span className="capitalize">{t(`status_${status}`)}</span>
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
                            {t('btn_processing')}
                        </Button>
                    ) : (
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                size="sm"
                                onClick={() => handleUpdateStatus(req.id, 'approved')}
                                className="bg-green-500 hover:bg-green-600 text-white h-8 px-3 rounded-lg"
                            >
                                <Check className="size-4 mr-1" /> {t('btn_approve')}
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                className="h-8 px-3 rounded-lg"
                            >
                                <X className="size-4 mr-1" /> {t('btn_reject')}
                            </Button>
                        </div>
                    )
                ) : (
                    <span className="text-xs text-gray-400 italic">{t('text_resolved')}</span>
                )}
            </TableCell>
        </TableRow>
    );
}