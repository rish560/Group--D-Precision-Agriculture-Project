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
import { FarmVerseAIWidget } from '../features/FarmVerseAIWidget';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { normalizeRole } from '../../config/roleRoutes';
import { navConfig } from '../../config/navConfig';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const currentRole = normalizeRole(user?.role);
  const filteredNav = useMemo(
    () => navConfig.filter((item) => item.allowedRoles.includes(currentRole)),
    [currentRole],
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return filteredNav.filter((item) => {
      const label = (t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.label) || '';
      return label.toLowerCase().includes(query) || item.to.toLowerCase().includes(query);
    });
  }, [searchQuery, filteredNav, t]);

  const goToSearchResult = (to) => {
    navigate(to);
    setSearchQuery('');
    setShowSearchResults(false);
    setMobileOpen(false);
  };

  const navSections = useMemo(() => {
    return filteredNav.reduce((acc, item) => {
      const section = item.section || 'Primary';
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    }, {});
  }, [filteredNav]);

  const pathLabel = location.pathname.replace('/dashboard/', '').replace('/', ' ') || 'Overview';
  const activeNavItem = filteredNav.find((item) => item.to === location.pathname);
  const translatedPathLabel = activeNavItem
    ? t(activeNavItem.labelKey)
    : (location.pathname === '/dashboard' ? t('dashboard') : pathLabel);

  const ROLE_LABEL_KEYS = {
    ADMIN: 'adminRole',
    FARM_MANAGER: 'farmManagerRole',
    GUEST: 'guestRole',
  };
  const roleLabel = ROLE_LABEL_KEYS[currentRole] ? t(ROLE_LABEL_KEYS[currentRole]) : (user?.role || t('dashboard'));

  const SECTION_KEYS = {
    Overview: 'overviewSection',
    Management: 'managementSection',
    'Farm operations': 'farmOperationsSection',
    Insights: 'insightsSection',
    Information: 'informationSection',
    Account: 'accountSection',
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-gray-100">
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
          className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:static lg:translate-x-0`}
        >
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600 text-white">
                <Leaf className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">FarmeVerse</span>
            </div>
            <button
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden dark:text-gray-500 dark:hover:bg-slate-800 dark:hover:text-gray-300"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Role badge */}
          <div className="border-b border-gray-100 px-5 py-3 dark:border-slate-800">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {roleLabel} {t('workspace')}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {Object.entries(navSections).map(([section, items]) => (
              <div key={section} className="mb-5">
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  {t(SECTION_KEYS[section] || section)}
                </p>
                <div className="space-y-0.5">
                  {items.map((navItem) => {
                    const { to, label, icon: Icon } = navItem;
                    return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100'
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        {t(navItem.labelKey) !== navItem.labelKey ? t(navItem.labelKey) : label}
                      </span>
                    </NavLink>
                  );})}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom: logout + system status */}
          <div className="border-t border-gray-200 p-3 dark:border-slate-800">
            <button
              type="button"
              onClick={() => { logout(); navigate('/login'); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {t('signOut')}
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
          className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden dark:text-gray-500 dark:hover:bg-slate-800 dark:hover:text-gray-300"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-600">
                {roleLabel}
              </p>
              <p className="text-sm font-semibold capitalize text-gray-900 dark:text-gray-100">{translatedPathLabel}</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-500">
                <Search className="h-4 w-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (searchResults.length > 0) {
                        goToSearchResult(searchResults[0].to);
                      } else if (searchQuery.trim()) {
                        addToast(`No pages found for "${searchQuery.trim()}".`, 'info');
                      }
                    } else if (e.key === 'Escape') {
                      setShowSearchResults(false);
                    }
                  }}
                  className="w-32 bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-gray-200"
                  placeholder={t('search')}
                  aria-label="Search everything"
                />
              </label>

              {showSearchResults && searchQuery.trim() && (
                <div className="absolute right-0 top-full z-40 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto py-1">
                      {searchResults.map((item) => {
                        const Icon = item.icon;
                        const label = t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.label;
                        return (
                          <li key={item.to}>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => goToSearchResult(item.to)}
                              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                              {label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="px-3 py-2.5 text-sm text-gray-400 dark:text-gray-500">
                      No matching pages found.
                    </p>
                  )}
                </div>
              )}
            </div>

            <LanguageSwitcher />

            <button
              className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-200"
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
              className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-200"
            >
              <Bell className="h-4 w-4" />
            </button>

            {/* User avatar */}
            <button
              type="button"
              onClick={() => navigate('/dashboard/profile')}
              aria-label="Go to profile"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 transition hover:bg-gray-100 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <UserCircle className="h-6 w-6 text-green-600" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-900 leading-none dark:text-gray-100">{user?.fullName}</p>
                <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">{user?.email}</p>
              </div>
            </button>
          </div>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* FarmVerse AI — floating assistant, available on every dashboard */}
      <FarmVerseAIWidget />
    </div>
  );
};
