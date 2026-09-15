import { DataTable } from 'src/components/utilities/table/DataTable';
import { useEffect, useState } from 'react';
import { Employee } from '../../../../interface';
import { api } from 'src/lib/apiClient';


const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const fetchEmployeeData = async () => {
    try {
      const { response, data } = await api.get('/api/employees')
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  }

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <DataTable data={employee} fetchEmployeeData={fetchEmployeeData} />
      </div>
    </>
  );
};

export default EmployeePage;
