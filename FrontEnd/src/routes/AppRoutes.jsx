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
import { NotificationsPage } from '../pages/DashboardPages';
import { FarmerSoilPage } from '../pages/Farmer/RolePages';
import { RecordManagement } from '../pages/RecordManagement';

// Valid roles: ADMIN | FARM_MANAGER | GUEST  (FARMER has been removed)
const ALL_ROLES  = ['GUEST', 'USER', 'ADMIN', 'FARM_MANAGER'];
const MGMT_ROLES = ['ADMIN', 'FARM_MANAGER'];

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
            <ProtectedRoute allowedRoles={ALL_ROLES}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Index: role-based landing */}
          <Route index element={<RoleDashboard />} />
          <Route path="manager" element={<RoleRedirect />} />
          <Route path="admin"   element={<RoleRedirect />} />

          {/* ── Admin / Farm Manager ── */}
          <Route
            path="add-farm"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
                <RecordManagement resource="farms" canManage title="Add and manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-crop"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
                <RecordManagement resource="crops" canManage title="Add and manage crops" />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-farms"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
                <RecordManagement resource="farms" canManage title="My farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="production"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
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
          {/* /farmers route removed — FARMER role no longer exists */}
          <Route
            path="farm-managers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="FARM_MANAGER" title="View farm managers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="guests"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="GUEST" title="View guests" />
              </ProtectedRoute>
            }
          />

          {/* ── All roles – farms & crops ── */}
          <Route
            path="farms"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
                <RecordManagement resource="farms" canManage title="Manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="crops"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
                <RecordManagement resource="crops" canManage title="Manage crops" />
              </ProtectedRoute>
            }
          />

          {/* ── Insights ── */}
          <Route
            path="soil"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
                <FarmerSoilPage />
              </ProtectedRoute>
            }
          />

          {/* ── Reports / Analytics ── */}
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Notifications / Settings ── */}
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={MGMT_ROLES}>
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
              <ProtectedRoute allowedRoles={ALL_ROLES}>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="help"
            element={
              <ProtectedRoute allowedRoles={ALL_ROLES}>
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
