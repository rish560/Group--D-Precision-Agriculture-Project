import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Unauthorized } from '../pages/Unauthorized';
import { RoleDashboard } from '../pages/RoleDashboard';
import { ReportsPage } from '../pages/Reports';
import { SettingsPage } from '../pages/Settings';
import { ProfilePage } from '../pages/Profile';
import { AboutPage } from '../pages/About';
import { HelpPage } from '../pages/Help';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { roleHomeRoute } from '../config/roleRoutes';
<<<<<<< HEAD
import { NotificationsPage } from '../pages/DashboardPages';
import { FarmerSoilPage } from '../pages/Farmer/RolePages';
import { RecordManagement } from '../pages/RecordManagement';

// Valid roles: ADMIN | FARM_MANAGER | GUEST  (FARMER has been removed)
const ALL_ROLES  = ['GUEST', 'USER', 'ADMIN', 'FARM_MANAGER'];
const MGMT_ROLES = ['ADMIN', 'FARM_MANAGER'];

=======
import { FarmMapPage, NotificationsPage } from '../pages/DashboardPages';
import { FarmerSoilPage, FarmerWeatherPage } from '../pages/Farmer/RolePages';
import { RecordManagement } from '../pages/RecordManagement';

>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
const RoleRedirect = () => {
  const { role } = useAuth();
  return <Navigate to={roleHomeRoute(role)} replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected dashboard shell */}
        <Route
          path="/dashboard"
          element={
<<<<<<< HEAD
            <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
            <ProtectedRoute allowedRoles={['FARMER', 'GUEST', 'FARM_MANAGER', 'ADMIN']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Index: role-based landing */}
          <Route index element={<RoleDashboard />} />
<<<<<<< HEAD
          <Route path="manager" element={<RoleRedirect />} />
          <Route path="admin"   element={<RoleRedirect />} />

          {/* ── Admin / Farm Manager ── */}
          <Route
            path="add-farm"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
=======
          <Route path="farmer"  element={<RoleRedirect />} />
          <Route path="manager" element={<RoleRedirect />} />
          <Route path="admin"   element={<RoleRedirect />} />

          {/* ── Admin / Farmer Creator ── */}
          <Route
            path="add-farm"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="farms" canManage title="Add and manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-crop"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
=======
              <ProtectedRoute allowedRoles={['ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="crops" canManage title="Add and manage crops" />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-farms"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
=======
              <ProtectedRoute allowedRoles={['FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="farms" canManage title="My farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="production"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
=======
              <ProtectedRoute allowedRoles={['FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="crops" canManage title="Crop production" />
              </ProtectedRoute>
            }
          />

          {/* ── Admin – users ── */}
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage title="Manage users" />
              </ProtectedRoute>
            }
          />
<<<<<<< HEAD
          {/* /farmers route removed — FARMER role no longer exists */}
=======
          <Route
            path="farmers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="Farmer" title="View farmers" />
              </ProtectedRoute>
            }
          />
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
          <Route
            path="farm-managers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
<<<<<<< HEAD
                <RecordManagement resource="users" canManage roleFilter="FARM_MANAGER" title="View farm managers" />
=======
                <RecordManagement resource="users" canManage roleFilter="FARM_MANAGER" title="Manage farm managers" />
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
              </ProtectedRoute>
            }
          />
          <Route
            path="guests"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
<<<<<<< HEAD
                <RecordManagement resource="users" canManage roleFilter="GUEST" title="View guests" />
=======
                <RecordManagement resource="users" canManage roleFilter="Guest" title="View guests" />
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
          {/* ── All roles – farms & crops ── */}
          <Route
            path="farms"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
          {/* ── Admin / Farmer / Guest – farms & crops ── */}
          <Route
            path="farms"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'USER', 'ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="farms" canManage title="Manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="crops"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
              <ProtectedRoute allowedRoles={['GUEST', 'USER', 'ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <RecordManagement resource="crops" canManage title="Manage crops" />
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
          {/* ── Insights ── */}
          <Route
            path="soil"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
          {/* ── Shared: Insights ── */}
          <Route
            path="soil"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'USER', 'ADMIN', 'FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <FarmerSoilPage />
              </ProtectedRoute>
            }
          />

          {/* ── Reports / Analytics ── */}
          <Route
            path="reports"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
=======
              <ProtectedRoute allowedRoles={['ADMIN', 'FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Notifications / Settings ── */}
          <Route
            path="notifications"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
=======
              <ProtectedRoute allowedRoles={['ADMIN', 'FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
=======
              <ProtectedRoute allowedRoles={['ADMIN', 'FARM_MANAGER', 'FARMER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Profile (all roles) ── */}
          <Route path="profile" element={<ProfilePage />} />

          {/* ── Information pages ── */}
          <Route
            path="about"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
              <ProtectedRoute allowedRoles={['GUEST', 'USER', 'ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="help"
            element={
<<<<<<< HEAD
              <ProtectedRoute allowedRoles={ALL_ROLES}>
=======
              <ProtectedRoute allowedRoles={['GUEST', 'USER', 'ADMIN', 'FARMER', 'FARM_MANAGER']}>
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                <HelpPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-slate-700">
              404 • Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
