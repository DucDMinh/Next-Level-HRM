import { useTranslation } from 'react-i18next';

interface PayrollTabsProps {
    activeTab: 'pending' | 'finalized';
    setActiveTab: (tab: 'pending' | 'finalized') => void;
    pendingCount: number;
    finalizedCount: number;
}

export const PayrollTabs = ({ activeTab, setActiveTab, pendingCount, finalizedCount }: PayrollTabsProps) => {
    const { t } = useTranslation('admin/payroll/payroll');

    return (
        <>
            <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'pending' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {t('tab_pending', { count: pendingCount })}
                    {activeTab === 'pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('finalized')}
                    className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'finalized' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {t('tab_finalized', { count: finalizedCount })}
                    {activeTab === 'finalized' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                </button>
            </div>
        </>
    )
}