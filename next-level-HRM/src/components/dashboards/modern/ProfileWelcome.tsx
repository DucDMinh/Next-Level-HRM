import userImg from '../../../assets/images/profile/user-1.jpg';
import supportImg from '../../../assets/images/dashboard/customer-support-img.png';
import { useEffect, useState } from 'react';

const ProfileWelcome = () => {

  const [employee, setEmployee] = useState<any[]>([]);

  const fetchUserData = async () => {
    const response = await fetch('https://lesson-starter-1.onrender.com/api/employees', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 030976c5-8795-497a-9520-c325816c6a3f'
      },
    });

    const data = await response.json();

    console.log('data: ', data);
    if (data) {
      setEmployee(data);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="relative flex items-center justify-between bg-lightsecondary rounded-lg p-6">
      <div className="flex items-center gap-3">
        <div>
          <img src={userImg} alt="user-img" width={50} height={50} className="rounded-full" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h5 className="card-title">{employee.length > 0 ? `Welcome back, ${employee[4].fullName}!` : 'Welcome back!'}</h5>
          <p className="text-muted-foreground">Check your reports</p>
        </div>
      </div>

      {/* Support Image */}
      <div className="hidden sm:block absolute right-8 bottom-0">
        <img src={supportImg} alt="support-img" width={145} height={95} />
      </div>
    </div>
  );
};

export default ProfileWelcome;
