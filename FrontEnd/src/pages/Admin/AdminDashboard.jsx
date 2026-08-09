import { Activity, BarChart3, MapPin, Users, Wheat } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RoleWorkspace } from '../../components/dashboard/RoleWorkspace';
import { getFarms } from '../../api/farmApi';
import { getCrops } from '../../api/cropApi';
import { getUsers } from '../../api/userApi';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const [counts, setCounts] = useState({ users: null, farms: null, crops: null });

  useEffect(() => {
    let cancelled = false;

    const loadCounts = async () => {
      const [usersResult, farmsResult, cropsResult] = await Promise.allSettled([
        getUsers(),
        getFarms(),
        getCrops(),
      ]);

      if (cancelled) return;

      setCounts({
        users: usersResult.status === 'fulfilled' ? (usersResult.value || []).length : null,
        farms: farmsResult.status === 'fulfilled' ? (farmsResult.value || []).length : null,
        crops: cropsResult.status === 'fulfilled' ? (cropsResult.value || []).length : null,
      });
    };

    loadCounts();
    return () => { cancelled = true; };
  }, []);

  const formatCount = (value) => (value === null ? '—' : String(value));

  return (
    <RoleWorkspace
      eyebrow={t('adminEyebrow')}
      title={t('adminTitle')}
      summary={t('adminSummary')}
      stats={[
        { title: t('statRegisteredUsers'), value: formatCount(counts.users), icon: Users, to: '/dashboard/users' },
        { title: t('statManagedFarms'), value: formatCount(counts.farms), icon: MapPin, to: '/dashboard/farms' },
        { title: t('statActiveCrops'), value: formatCount(counts.crops), icon: Wheat, to: '/dashboard/crops' },
        { title: t('statPlatformHealth'), value: '99.98%', icon: Activity },
      ]}
      actions={[
        { label: t('manageUsers'), to: '/dashboard/users', icon: Users },
        { label: t('actionFarmManagers'), to: '/dashboard/farm-managers', icon: Users },
        { label: t('actionManageFarms'), to: '/dashboard/farms', icon: MapPin },
      ]}
    />
  );
};
