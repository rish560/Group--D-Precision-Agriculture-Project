import { normalizeRole } from '../config/roleRoutes';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './Admin/AdminDashboard';
import { FarmerDashboard } from './Farmer/FarmerDashboard';
import { ManagerDashboard } from './FarmManager/ManagerDashboard';
import { GuestDashboard } from './Guest/GuestDashboard';

export const RoleDashboard = () => {
  const { user } = useAuth();
  const dashboards = { ADMIN: AdminDashboard, FARM_MANAGER: ManagerDashboard, FARMER: FarmerDashboard, GUEST: GuestDashboard };
  const Dashboard = dashboards[normalizeRole(user?.role)] || GuestDashboard;
  return <Dashboard />;
};
