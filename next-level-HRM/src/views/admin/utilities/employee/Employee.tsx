import { DataTable } from 'src/components/utilities/table/DataTable';
import { useEffect, useState } from 'react';
import { Employee } from '../../../../interface';
import { useAuth } from 'src/middleware/AuthContext';


const EmployeePage = () => {
  const { token } = useAuth();
  const [employee, setEmployee] = useState<Employee[]>([]);
  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('https://lesson-starter-1.onrender.com/api/employees', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
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
        <DataTable data={employee as unknown as Record<string, unknown>[]} />
      </div>
    </>
  );
};

export default EmployeePage;
