import { CloudSun, Leaf, MapPin, Wheat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { RoleWorkspace } from '../../components/dashboard/RoleWorkspace';

export const GuestDashboard = () => {
  const { t } = useLanguage();
  return (
    <RoleWorkspace
      eyebrow={t('guestEyebrow')}
      title={t('guestTitle')}
      summary={t('guestSummary')}
      stats={[
        { title: t('statFarmsAvailable'), value: '24', icon: MapPin },
        { title: t('statCropRecords'), value: '61', icon: Wheat },
        { title: t('statSoilHealthIndex'), value: '94/100', icon: Leaf },
      ]}
      actions={[
        { label: t('viewFarms'), to: '/dashboard/farms', icon: MapPin },
        { label: t('viewCrops'), to: '/dashboard/crops', icon: Wheat },
        { label: t('soilDetails'), to: '/dashboard/soil', icon: Leaf },
      ]}
    />
  );
};
