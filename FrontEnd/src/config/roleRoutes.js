export const roleRoutes = {
  FARMER: '/dashboard',
  GUEST: '/dashboard',
  FARM_MANAGER: '/dashboard',
  ADMIN: '/dashboard',
};

export const normalizeRole = (role = '') => {
  if (!role || typeof role !== 'string') return '';
  const normalized = role.trim().toUpperCase().replace(/\s+/g, '_');
  const map = {
    GUEST: 'GUEST',
    GUEST_USER: 'GUEST',
    'GUEST_USER': 'GUEST',
    'GUEST USER': 'GUEST',
    FARMER: 'FARMER',
    FARM_MANAGER: 'FARM_MANAGER',
    ADMIN: 'ADMIN',
    'FARM MANAGER': 'FARM_MANAGER',
  };
  return map[normalized] || normalized;
};

export const roleHomeRoute = (role) => roleRoutes[normalizeRole(role)] || '/login';
