export const roleRoutes = {
<<<<<<< HEAD
=======
  FARMER: '/dashboard',
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  GUEST: '/dashboard',
  FARM_MANAGER: '/dashboard',
  ADMIN: '/dashboard',
};

export const normalizeRole = (role = '') => {
  if (!role || typeof role !== 'string') return '';
<<<<<<< HEAD
  let normalized = role.trim().toUpperCase().replace(/\s+/g, '_');
  if (normalized.startsWith('ROLE_')) {
    normalized = normalized.substring(5);
  }
  const map = {
    GUEST: 'GUEST',
    GUESTS: 'GUEST',
    GUEST_USER: 'GUEST',
    'GUEST USER': 'GUEST',
    FARM_MANAGER: 'FARM_MANAGER',
    FARM_MANAGERS: 'FARM_MANAGER',
    'FARM MANAGER': 'FARM_MANAGER',
    MANAGER: 'FARM_MANAGER',
    ADMIN: 'ADMIN',
    ADMINISTRATOR: 'ADMIN',
=======
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
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  };
  return map[normalized] || normalized;
};

export const roleHomeRoute = (role) => roleRoutes[normalizeRole(role)] || '/login';
<<<<<<< HEAD

=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
