import { Bell, BarChart3, FileText, Leaf, MapPin, Settings, ShieldCheck, Sprout, UserCircle, UserCog, Users, Wheat, Info, HelpCircle } from 'lucide-react';

const roles = { 
  admin: ['ADMIN'], 
  manager: ['FARM_MANAGER'],   // FARMER removed — not a valid role
  guest: ['GUEST', 'USER'] 
};

export const navConfig = [
  { to: '/dashboard', label: 'Dashboard', labelKey: 'dashboard', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Overview', icon: Sprout },
  
  // Admin & Farm Manager actions
  { to: '/dashboard/add-farm', label: 'Add Farm', labelKey: 'addFarm', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: MapPin },
  { to: '/dashboard/add-crop', label: 'Add Crop', labelKey: 'addCrop', allowedRoles: [...roles.admin, ...roles.manager], section: 'Overview', icon: Leaf },
  
  // Admin User Sub-roles management (View Farmers removed)
  { to: '/dashboard/users', label: 'Manage Users', labelKey: 'manageUsers', allowedRoles: roles.admin, section: 'Management', icon: Users },
  { to: '/dashboard/admins', label: 'View Admins', labelKey: 'viewAdmins', allowedRoles: roles.admin, section: 'Management', icon: ShieldCheck },
  { to: '/dashboard/farm-managers', label: 'View Farm Managers', labelKey: 'viewFarmManagers', allowedRoles: roles.admin, section: 'Management', icon: UserCog },
  { to: '/dashboard/guests', label: 'View Guests', labelKey: 'viewGuests', allowedRoles: roles.admin, section: 'Management', icon: Users },
  
  // Farms and Crops
  { to: '/dashboard/farms', label: 'View Farms', labelKey: 'viewFarms', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Farm operations', icon: MapPin },
  { to: '/dashboard/my-farms', label: 'My Farms', labelKey: 'myFarms', allowedRoles: roles.manager, section: 'Farm operations', icon: MapPin },
  { to: '/dashboard/crops', label: 'View Crops', labelKey: 'viewCrops', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Farm operations', icon: Wheat },
  { to: '/dashboard/production', label: 'My Crops', labelKey: 'myCrops', allowedRoles: roles.manager, section: 'Farm operations', icon: BarChart3 },
  
  // Insights
  { to: '/dashboard/soil', label: 'Soil Details', labelKey: 'soilDetails', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Insights', icon: Leaf },
  { to: '/dashboard/reports', label: 'Reports', labelKey: 'reports', allowedRoles: [...roles.admin, ...roles.manager], section: 'Insights', icon: FileText },
  
  // Guest view pages
  { to: '/dashboard/about', label: 'About', labelKey: 'about', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Information', icon: Info },
  { to: '/dashboard/help', label: 'Help', labelKey: 'help', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Information', icon: HelpCircle },

  // Account
  { to: '/dashboard/notifications', label: 'Notifications', labelKey: 'notifications', allowedRoles: [...roles.admin, ...roles.manager], section: 'Account', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile', labelKey: 'profile', allowedRoles: [...roles.admin, ...roles.manager, ...roles.guest], section: 'Account', icon: UserCircle },
  { to: '/dashboard/settings', label: 'Settings', labelKey: 'settings', allowedRoles: [...roles.admin, ...roles.manager], section: 'Account', icon: Settings },
];