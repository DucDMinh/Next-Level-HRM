import { useLocation, Navigate } from "react-router";
import { useAuth } from "src/providers/AuthContext";
import Spinner from "src/views/admin/spinner/Spinner";

const NavigateHandler = ({ children }: { children: any }) => {
    const { user, isFetchingUser } = useAuth();
    const location = useLocation();
    const isAdminRole = user?.role === 'admin';

    if (isFetchingUser) {
        return <><Spinner /></>
    }

    if (isAdminRole && location.pathname === '/') {
        return <Navigate to={'/admin'} />
    }

    if (!isAdminRole && location.pathname.startsWith('/admin')) {
        return <Navigate to={'/'} />
    }

    return <>{children}</>
}

export default NavigateHandler;