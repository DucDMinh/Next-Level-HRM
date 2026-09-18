import { Filter, Search } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from 'react-i18next';

export const LeaveRequestHeader = ({
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus
}: {
    searchQuery: string,
    setSearchQuery: Dispatch<SetStateAction<string>>,
    filterStatus: string,
    setFilterStatus: Dispatch<SetStateAction<string>>
}) => {
    const { t } = useTranslation('admin/leave-request/leave-request');

    return (
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t('header_title')}
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
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
                        <option value="all">{t('filter_all')}</option>
                        <option value="pending">{t('filter_pending')}</option>
                        <option value="approved">{t('filter_approved')}</option>
                        <option value="rejected">{t('filter_rejected')}</option>
                    </select>
                </div>
            </div>
        </div>
    )
}