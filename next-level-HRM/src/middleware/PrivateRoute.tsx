import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ requiredRole }: { requiredRole: string }) => {
    const token = Cookies.get('accessToken');
    const { user } = useAuth();
    if (!token || !user) {
        return <Navigate to="/auth/auth2/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/auth/404" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;    