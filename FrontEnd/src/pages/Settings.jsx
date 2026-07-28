import { Bell, Languages, MoonStar, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';

export const SettingsPage = () => {
  const { t } = useLanguage();

  const baseSettings = [
    { key: 'notificationsSetting', title: t('notificationsSetting'), icon: Bell, detail: 'SMS, email, and push alerts enabled', enabled: true },
    { key: 'languageSetting', title: t('languageSetting'), icon: Languages, detail: t('language'), enabled: true },
    { key: 'themeSetting', title: t('themeSetting'), icon: MoonStar, detail: 'Light, dark, and auto mode supported', enabled: true },
    { key: 'securitySetting', title: t('securitySetting'), icon: ShieldCheck, detail: 'OTP and session protection active', enabled: true },
    { key: 'devicesSetting', title: t('devicesSetting'), icon: Smartphone, detail: 'Two connected devices synced', enabled: false },
    { key: 'experienceSetting', title: t('experienceSetting'), icon: Sparkles, detail: 'Feature-rich premium interface', enabled: true },
  ];

  const [settings, setSettings] = useState(baseSettings);

  const toggleSetting = (key) => {
    setSettings((current) =>
      current.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              {t('preferences')}
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">{t('fineTuneWorkspace')}</h2>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500">
            {t('lastSynced')} <span className="ml-1 font-semibold text-gray-900">2 min ago</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {settings.map(({ key, title, icon: Icon, detail, enabled }) => (
            <div
              key={key}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 text-green-600 shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => toggleSetting(key)}
                  role="switch"
                  aria-checked={enabled}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                    enabled ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
