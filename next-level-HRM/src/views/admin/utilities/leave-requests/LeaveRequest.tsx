import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import CardBox from 'src/components/shared/CardBox';
import { toast } from 'sonner';
import { LeaveRequest } from 'src/interface';
import { api } from 'src/lib/apiClient';
import { LeaveRequestHeader } from './LeaveRequestHeader';
import { LeaveRequestTableData } from './LeaveRequestTableData';
import { useTranslation } from 'react-i18next';

const LeaveRequestAdmin = () => {
    const { t } = useTranslation('admin/leave-request/leave-request');

    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                toast.error(t('error_fetch_data'));
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, [t]);

    const filteredRequests = requests.filter((req) => {
        const matchesSearch = !searchQuery.trim() || req.employeeId.toString().includes(searchQuery.trim());
        const currentStatus = (req.status || '').toLowerCase().trim();
        const matchesFilter = filterStatus === 'all' || currentStatus === filterStatus;

        return matchesSearch && matchesFilter;
    });

    return (
        <CardBox className="h-full">
            <LeaveRequestHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />
            <div className="overflow-x-auto p-2 relative scrollbar-thin max-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 dark:bg-white/5">
                            <TableHead className="font-semibold">{t('th_id')}</TableHead>
                            <TableHead className="font-semibold">{t('th_employee_id')}</TableHead>
                            <TableHead className="font-semibold">{t('th_leave_period')}</TableHead>
                            <TableHead className="font-semibold min-w-[200px]">{t('th_reason')}</TableHead>
                            <TableHead className="font-semibold">{t('th_status')}</TableHead>
                            <TableHead className="font-semibold text-right">{t('th_actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRequests.length > 0 ? (
                            [...filteredRequests].reverse().map((req) => {
                                return (
                                    <LeaveRequestTableData
                                        key={req.id}
                                        req={req}
                                        setRequests={setRequests}
                                    />
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                                    {isLoading ? t('loading_requests') : t('no_requests_found')}
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