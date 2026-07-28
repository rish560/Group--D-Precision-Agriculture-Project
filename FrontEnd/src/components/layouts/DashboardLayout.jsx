import { motion } from 'framer-motion';
import {
  Bell,
  ChevronRight,
  Leaf,
  LogOut,
  Menu,
  Search,
  Settings,
  SunMoon,
  UserCircle,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../features/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { normalizeRole } from '../../config/roleRoutes';
import { navConfig } from '../../config/navConfig';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const currentRole = normalizeRole(user?.role);
  const filteredNav = useMemo(
    () => navConfig.filter((item) => item.allowedRoles.includes(currentRole)),
    [currentRole],
  );

  const navSections = useMemo(() => {
    return filteredNav.reduce((acc, item) => {
      const section = item.section || 'Primary';
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    }, {});
  }, [filteredNav]);

  const pathLabel = location.pathname.replace('/dashboard/', '').replace('/', ' ') || 'Overview';

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-gray-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:static lg:translate-x-0`}
        >
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600 text-white">
                <Leaf className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-gray-900">FarmVerse</span>
            </div>
            <button
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Role badge */}
          <div className="border-b border-gray-100 px-5 py-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {user?.role || 'User'} workspace
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {Object.entries(navSections).map(([section, items]) => (
              <div key={section} className="mb-5">
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  {section}
                </p>
                <div className="space-y-0.5">
                  {items.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-green-50 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom: logout + system status */}
          <div className="border-t border-gray-200 p-3">
            <button
              type="button"
              onClick={() => { logout(); navigate('/login'); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-600">
                {user?.role || 'Dashboard'}
              </p>
              <p className="text-sm font-semibold capitalize text-gray-900">{pathLabel}</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <label className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 sm:flex">
              <Search className="h-4 w-4" />
              <input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToast('Use the search controls on each data page to search records.', 'info');
                  }
                }}
                className="w-32 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="Search…"
                aria-label="Search records"
              />
            </label>

            <LanguageSwitcher />

            <button
              className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              <SunMoon className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Open notifications"
              onClick={() =>
                currentRole === 'GUEST'
                  ? addToast('Guests do not receive operational notifications.', 'info')
                  : navigate('/dashboard/notifications')
              }
              className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
            >
              <Bell className="h-4 w-4" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
              <UserCircle className="h-6 w-6 text-green-600" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-900 leading-none">{user?.fullName}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
