import { useMemo, useState } from 'react';
import { Table, Input, Button, Space, Tag, Avatar, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Trash2, Pencil } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import CardBox from '../../shared/CardBox';
import { AddEmployeeModal } from 'src/components/modals/admin/employee/AddEmployeeModal';
import { EditEmployeeModal } from 'src/components/modals/admin/employee/EditEmployeeModal';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import { useAuth } from 'src/providers/AuthContext';
import { Employee } from 'src/interface';
import { useTranslation } from 'react-i18next';

const antdColors = ['blue', 'green', 'gold', 'purple', 'magenta', 'geekblue', 'cyan', 'volcano'];

export function getColorForValue(value: string) {
  const index = Math.abs(value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % antdColors.length;
  return antdColors[index];
}

export const DataTable = ({
  data = [],
  fetchEmployeeData,
}: {
  data?: Employee[];
  fetchEmployeeData: () => void;
}) => {
  const { t } = useTranslation('admin/employee/employee');

  const [globalFilter, setGlobalFilter] = useState('');
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isEditEmpModalOpen, setIsEditEmpModalOpen] = useState(false);
  const [currentEmp, setCurrentEmp] = useState<Employee | null>(null);

  const { user } = useAuth();

  const handleDeleteEmp = async (id: string) => {
    try {
      if (id === user?.id) {
        toast.error(t('error_delete_current_user'));
        return;
      }
      const { response, data: resData } = await api.delete(`/api/employees/${id}`);
      if (!response.ok) {
        toast.error(resData.message);
        return;
      }
      toast.success(t('success_user_deleted'));
      fetchEmployeeData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    const lowerFilter = globalFilter.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val ?? '').toLowerCase().includes(lowerFilter)
      )
    );
  }, [data, globalFilter]);

  const columns: ColumnsType<Employee> = [
    {
      title: t('col_username'),
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => (a.username || '').localeCompare(b.username || ''),
      render: (text) => {
        const color = getColorForValue(String(text || ''));
        return (
          <Space>
            <Avatar style={{ backgroundColor: color, color: '#fff' }}>
              {text ? String(text)[0].toUpperCase() : '?'}
            </Avatar>
            <span className="font-semibold text-gray-900 dark:text-white">
              {text || '-'}
            </span>
          </Space>
        );
      },
    },
    {
      title: t('col_fullname'),
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => (a.fullName || '').localeCompare(b.fullName || ''),
      render: (text) => <span className="font-medium">{text || '-'}</span>,
    },
    {
      title: t('col_email'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
      render: (text) => <span className="font-medium">{text || '-'}</span>,
    },
    {
      title: t('col_department'),
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => (a.department || '').localeCompare(b.department || ''),
      render: (text) => <span className="font-medium">{text || '-'}</span>,
    },
    {
      title: t('col_role'),
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => (a.role || '').localeCompare(b.role || ''),
      render: (text) => {
        const color = getColorForValue(String(text || ''));
        return <Tag color={color} className="rounded-full px-2">{text || '-'}</Tag>;
      },
    },
    {
      title: t('col_action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            shape="circle"
            icon={<Pencil className="size-4 text-blue-600" />}
            onClick={() => {
              setCurrentEmp(record);
              setIsEditEmpModalOpen(true);
            }}
          />
          <Popconfirm
            title={t('delete_confirm_title')}
            description={t('delete_confirm_desc')}
            onConfirm={() => handleDeleteEmp(record.id as string)}
            okText={t('btn_yes')}
            cancelText={t('btn_no')}
          >
            <Button
              type="text"
              danger
              shape="circle"
              icon={<Trash2 className="size-4" />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <CardBox>
      <div className="p-4 pt-0 flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-semibold mb-0">{t('table_title')}</h3>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder={t('search_placeholder')}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="flex-1 lg:w-96"
            size="large"
          />
          <button
            className="px-4 py-2 h-[40px] shrink-0 whitespace-nowrap bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => setIsAddEmpModalOpen(true)}
          >
            {t('btn_add')}
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '50'],
          showSizeChanger: true,
          showTotal: (total, range) => {
            const current = Math.ceil(range[1] / (range[1] - range[0] + 1));
            const totalPage = Math.ceil(total / (range[1] - range[0] + 1));
            return t('pagination_total', { current, totalPage, total });
          },
        }}
        scroll={{ x: 'max-content' }}
        className="border rounded-md"
      />

      {isAddEmpModalOpen && (
        <AddEmployeeModal
          isOpen={isAddEmpModalOpen}
          onClose={() => setIsAddEmpModalOpen(false)}
          fetchEmployeeData={fetchEmployeeData}
        />
      )}

      {isEditEmpModalOpen && (
        <EditEmployeeModal
          emp={currentEmp}
          isOpen={isEditEmpModalOpen}
          onClose={() => setIsEditEmpModalOpen(false)}
          fetchEmployeeData={fetchEmployeeData}
        />
      )}
    </CardBox>
  );
};