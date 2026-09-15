import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/auth/auth2/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;    