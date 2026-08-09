import { Activity, BarChart3, Leaf, MapPin, Wheat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { RoleWorkspace } from '../../components/dashboard/RoleWorkspace';

export const ManagerDashboard = () => {
  const { t } = useLanguage();
  return (
    <RoleWorkspace
      eyebrow={t('managerEyebrow')}
      title={t('managerTitle')}
      summary={t('managerSummary')}
      stats={[
        { title: t('statAssignedFarms'), value: '6', icon: MapPin },
        { title: t('statCropCycles'), value: '14', icon: Wheat },
        { title: t('statFieldEfficiency'), value: '91%', icon: Activity },
      ]}
      actions={[
        { label: t('actionCropProduction'), to: '/dashboard/production', icon: BarChart3 },
        { label: t('soilDetails'), to: '/dashboard/soil', icon: Leaf },
      ]}
    />
  );
};
