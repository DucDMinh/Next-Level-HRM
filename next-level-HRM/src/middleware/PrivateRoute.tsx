import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ requiredRole }: { requiredRole: string }) => {
    const token = Cookies.get('accessToken');
    const userRole = localStorage.getItem('userRole');
    if (!token) {
        return <Navigate to="/auth/auth2/login" replace />;
    }
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/404" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;