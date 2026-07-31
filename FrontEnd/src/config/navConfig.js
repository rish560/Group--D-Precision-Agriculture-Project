<<<<<<< HEAD
import { Bell, BarChart3, FileText, Leaf, MapPin, Settings, Sprout, UserCircle, UserCog, Users, Wheat, Info, HelpCircle } from 'lucide-react';

const roles = { 
  admin: ['ADMIN'], 
  manager: ['FARM_MANAGER'],   // FARMER removed — not a valid role
=======
import { Bell, BarChart3, CloudSun, FileText, Leaf, Map, MapPin, Settings, Sprout, UserCircle, UserCog, Users, Wheat, Info, HelpCircle } from 'lucide-react';

const roles = { 
  admin: ['ADMIN'], 
  manager: ['FARM_MANAGER', 'FARMER'], 
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  guest: ['GUEST', 'USER'] 
};

export const navConfig = [
  { to: '/dashboard', label: 'Dashboard', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Overview', icon: Sprout },
  
<<<<<<< HEAD
  // Admin & Farm Manager actions
  { to: '/dashboard/add-farm', label: 'Add Farm', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: MapPin },
  { to: '/dashboard/add-crop', label: 'Add Crop', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: Leaf },
  
  // Admin User Sub-roles management (View Farmers removed)
  { to: '/dashboard/users', label: 'Manage Users', allowedRoles: roles.admin, section: 'Management', icon: Users },
=======
  // Admin & Farmer actions
  { to: '/dashboard/add-farm', label: 'Add Farm', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: MapPin },
  { to: '/dashboard/add-crop', label: 'Add Crop', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: Leaf },
  
  // Admin User Sub-roles management
  { to: '/dashboard/users', label: 'Manage Users', allowedRoles: roles.admin, section: 'Management', icon: Users },
  { to: '/dashboard/farmers', label: 'View Farmers', allowedRoles: roles.admin, section: 'Management', icon: Users },
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  { to: '/dashboard/farm-managers', label: 'View Farm Managers', allowedRoles: roles.admin, section: 'Management', icon: UserCog },
  { to: '/dashboard/guests', label: 'View Guests', allowedRoles: roles.admin, section: 'Management', icon: Users },
  
  // Farms and Crops
  { to: '/dashboard/farms', label: 'View Farms', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Farm operations', icon: MapPin },
  { to: '/dashboard/my-farms', label: 'My Farms', allowedRoles: roles.manager, section: 'Farm operations', icon: MapPin },
  { to: '/dashboard/crops', label: 'View Crops', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Farm operations', icon: Wheat },
  { to: '/dashboard/production', label: 'My Crops', allowedRoles: roles.manager, section: 'Farm operations', icon: BarChart3 },
  
  // Insights
  { to: '/dashboard/soil', label: 'Soil Details', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Insights', icon: Leaf },
  { to: '/dashboard/reports', label: 'Reports', allowedRoles: [...roles.admin, ...roles.manager], section: 'Insights', icon: FileText },
  
  // Guest view pages
  { to: '/dashboard/about', label: 'About', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Information', icon: Info },
  { to: '/dashboard/help', label: 'Help', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Information', icon: HelpCircle },

  // Account
  { to: '/dashboard/notifications', label: 'Notifications', allowedRoles: [...roles.admin, ...roles.manager], section: 'Account', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Account', icon: UserCircle },
  { to: '/dashboard/settings', label: 'Settings', allowedRoles: [...roles.admin, ...roles.manager], section: 'Account', icon: Settings },
];
<<<<<<< HEAD

=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
