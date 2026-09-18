// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from 'src/components/PrivateRoute';
import NavigateHandler from 'src/components/NavigateHandler';

//Public
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ClientLayout = Loadable(lazy(() => import('../layouts/client/ClientLayout')))
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
//Admin
const Modern = Loadable(lazy(() => import('../views/admin/dashboards/Modern')));
const AttendanceAdmin = Loadable(lazy(() => import('../views/admin/utilities/attendances/Attendance')));
const Employee = Loadable(lazy(() => import('../views/admin/utilities/employee/Employee')));
const LeaveRequestAdmin = Loadable(lazy(() => import('../views/admin/utilities/leave-requests/LeaveRequest')));
const PayrollAdmin = Loadable(lazy(() => import('../views/admin/utilities/payrolls/PayrollPage')));
//User
const Dashboard = Loadable(lazy(() => import('../views/(employee)/dashboards/Dashboard')))
const Attendance = Loadable(lazy(() => import('../views/(employee)/attendances/Attendance')))
const LeaveRequest = Loadable(lazy(() => import('../views/(employee)/leave-request/LeaveRequest')))
const Payroll = Loadable(lazy(() => import('../views/(employee)/payrolls/PayrollPage')))
const Router = [
  {
    path: '/admin',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <NavigateHandler><FullLayout /></NavigateHandler>,
        children: [
          { path: '', exact: true, element: <Modern /> },
          { path: 'utilities/employee', element: <Employee /> },
          { path: 'utilities/attendances', element: <AttendanceAdmin /> },
          { path: 'utilities/leave-requests', element: <LeaveRequestAdmin /> },
          { path: 'utilities/payrolls', element: <PayrollAdmin /> },
        ],
      }
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: 'auth2/login', element: <Login2 /> },
      { path: 'auth2/register', element: <Register2 /> },
      { path: 'maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }, {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <NavigateHandler><ClientLayout /></NavigateHandler>,
        children: [
          { path: '', exact: true, element: <Dashboard /> },
          { path: 'attendance', element: <Attendance /> },
          { path: 'leave-request', element: <LeaveRequest /> },
          { path: 'payroll', element: <Payroll /> }
        ],
      }
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
