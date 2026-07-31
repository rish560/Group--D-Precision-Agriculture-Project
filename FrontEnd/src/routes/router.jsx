import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Unauthorized } from '../pages/Unauthorized';
<<<<<<< HEAD
import { ManagerDashboard } from '../pages/FarmManager/ManagerDashboard';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import { roleRoutes, normalizeRole } from '../config/roleRoutes';

// Valid roles: ADMIN | FARM_MANAGER | GUEST  (FARMER removed)
const roleHomeMap = {
  FARM_MANAGER: roleRoutes.FARM_MANAGER,
  ADMIN: roleRoutes.ADMIN,
  GUEST: roleRoutes.GUEST,
=======
import { FarmerDashboard } from '../pages/Farmer/FarmerDashboard';
import { ManagerDashboard } from '../pages/FarmManager/ManagerDashboard';
import { ExpertDashboard } from '../pages/Expert/ExpertDashboard';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import { roleRoutes, normalizeRole } from '../config/roleRoutes';

const roleHomeMap = {
  FARMER: roleRoutes.FARMER,
  FARM_MANAGER: roleRoutes.FARM_MANAGER,
  EXPERT: roleRoutes.EXPERT,
  ADMIN: roleRoutes.ADMIN,
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
};

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  {
    path: '/dashboard',
    element: (
<<<<<<< HEAD
      <ProtectedRoute allowedRoles={['FARM_MANAGER', 'ADMIN', 'GUEST', 'USER']}>
=======
      <ProtectedRoute allowedRoles={['FARMER', 'FARM_MANAGER', 'EXPERT', 'ADMIN']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
<<<<<<< HEAD
      { index: true, element: <Navigate to={roleRoutes.ADMIN} replace /> },
      { path: 'manager', element: <ManagerDashboard /> },
=======
      { index: true, element: <Navigate to={roleRoutes.FARMER} replace /> },
      { path: 'farmer', element: <FarmerDashboard /> },
      { path: 'manager', element: <ManagerDashboard /> },
      { path: 'expert', element: <ExpertDashboard /> },
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
      { path: 'admin', element: <AdminDashboard /> },
    ],
  },
  { path: '*', element: <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-slate-700">404 • Page not found</div> },
]);

export const getRoleHomeRoute = (role) => roleHomeMap[normalizeRole(role)] || '/login';
<<<<<<< HEAD

=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
