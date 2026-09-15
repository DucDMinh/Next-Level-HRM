import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ requiredRole }: { requiredRole: string }) => {
    const token = Cookies.get('accessToken');
    const navigate = useNavigate();
    const { user } = useAuth()
    if (!token) {
        navigate('/auth/auth2/login');
    }
    console.log(requiredRole)
    if (requiredRole && user?.role !== requiredRole) {
        navigate('/auth/404');
    }
    return <Outlet />;
};

export default PrivateRoute;