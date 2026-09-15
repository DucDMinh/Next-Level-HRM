// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from 'src/middleware/PrivateRoute';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const Modern = Loadable(lazy(() => import('../views/admin/dashboards/Modern')));
const UserProfile = Loadable(lazy(() => import('../views/admin/user-profile/UserProfile')));
const Employee = Loadable(lazy(() => import('../views/admin/utilities/employee/Employee')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const SolarIcon = Loadable(lazy(() => import('../views/admin/icons/SolarIcon')));

const Router = [
  {
    path: '/admin',
    element: <PrivateRoute requiredRole="admin" />,
    children: [
      {
        path: '',
        element: <FullLayout />,
        children: [
          { path: '', exact: true, element: <Modern /> },
          { path: 'utilities/employee', element: <Employee /> },
          { path: 'user-profile', element: <UserProfile /> },
          { path: 'icons/iconify', element: <SolarIcon /> },
        ],
      }
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/auth2/login', element: <Login2 /> },
      { path: '/auth/auth2/register', element: <Register2 /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
