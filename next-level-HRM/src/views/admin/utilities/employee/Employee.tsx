import { DataTable } from 'src/components/utilities/table/DataTable';
import { useEffect, useState } from 'react';
import { Employee } from '../../../../interface';


const EmployeePage = () => {

  const [employee, setEmployee] = useState<Employee[]>([]);
  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('https://lesson-starter-1.onrender.com/api/employees', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 030976c5-8795-497a-9520-c325816c6a3f'
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
