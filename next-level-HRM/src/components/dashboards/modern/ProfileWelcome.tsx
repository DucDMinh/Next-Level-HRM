import userImg from '../../../assets/images/profile/user-1.jpg';
import supportImg from '../../../assets/images/dashboard/customer-support-img.png';
import { useEffect, useState } from 'react';
import { api } from 'src/lib/apiClient';
import { useAuth } from 'src/providers/AuthContext';

const ProfileWelcome = () => {

  const [employee, setEmployee] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchUserData = async () => {
    const { response, data } = await api.get('/api/employees')
    if (!response.ok) throw new Error(data.message);
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
          <h5 className="card-title">{user?.username ? `Welcome back, ${user.username}!` : 'Welcome back!'}</h5>
          <p className="text-muted-foreground">You have {employee.length} employees</p>
        </div>
      </div>

      <div className="hidden sm:block absolute right-8 bottom-0">
        <img src={supportImg} alt="support-img" width={145} height={95} />
      </div>
    </div>
  );
};

export default ProfileWelcome;
