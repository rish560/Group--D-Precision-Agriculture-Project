import { normalizeRole } from '../config/roleRoutes';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './Admin/AdminDashboard';
<<<<<<< HEAD
import { ManagerDashboard } from './FarmManager/ManagerDashboard';
import { GuestDashboard } from './Guest/GuestDashboard';

// Valid roles: ADMIN | FARM_MANAGER | GUEST  (FARMER removed)
export const RoleDashboard = () => {
  const { user } = useAuth();
  const dashboards = {
    ADMIN: AdminDashboard,
    FARM_MANAGER: ManagerDashboard,
    GUEST: GuestDashboard,
  };
  const Dashboard = dashboards[normalizeRole(user?.role)] || GuestDashboard;
  return <Dashboard />;
};

=======
import { FarmerDashboard } from './Farmer/FarmerDashboard';
import { ManagerDashboard } from './FarmManager/ManagerDashboard';
import { GuestDashboard } from './Guest/GuestDashboard';

export const RoleDashboard = () => {
  const { user } = useAuth();
  const dashboards = { ADMIN: AdminDashboard, FARM_MANAGER: ManagerDashboard, FARMER: FarmerDashboard, GUEST: GuestDashboard };
  const Dashboard = dashboards[normalizeRole(user?.role)] || GuestDashboard;
  return <Dashboard />;
};
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
