import { AlertTriangle, CloudRain, Droplets, Leaf, MapPin, Sparkles, Waves } from 'lucide-react';
import { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { Card } from '../ui/Card';

export const SmartPanels = ({ weather, notifications, farms }) => {
  const { t } = useLanguage();
  const { isOffline } = useOffline();

  const summary = useMemo(() => ({
    irrigationDue: notifications.filter((item) => item.title.toLowerCase().includes('irrigation')).length,
    harvestDue: notifications.filter((item) => item.title.toLowerCase().includes('harvest')).length,
    alerts: weather?.alerts?.length ?? 0,
    farmCount: farms.length,
  }), [notifications, weather, farms]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="border-emerald-100 bg-gradient-to-br from-emerald-600 to-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-100">{t('notifications')}</p>
            <p className="mt-2 text-2xl font-semibold">{summary.irrigationDue + summary.harvestDue}</p>
          </div>
          <Droplets className="h-8 w-8" />
        </div>
        <p className="mt-4 text-sm text-emerald-50">Irrigation and harvest reminders are tuned for this week.</p>
      </Card>
      <Card className="border-sky-100 bg-gradient-to-br from-sky-600 to-cyan-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-100">{t('weather')}</p>
            <p className="mt-2 text-2xl font-semibold">{weather?.current?.temp ?? '--'}°C</p>
          </div>
          <CloudRain className="h-8 w-8" />
        </div>
        <p className="mt-4 text-sm text-sky-50">Humidity {weather?.current?.humidity ?? '--'}% • Rain {weather?.current?.rainfall ?? '--'}%</p>
      </Card>
      <Card className="border-amber-100 bg-gradient-to-br from-amber-500 to-orange-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-100">{t('alerts')}</p>
            <p className="mt-2 text-2xl font-semibold">{summary.alerts}</p>
          </div>
          <AlertTriangle className="h-8 w-8" />
        </div>
        <p className="mt-4 text-sm text-amber-50">Weather warnings and proactive field advisories are active.</p>
      </Card>
      <Card className="border-slate-200 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-700">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em]">AgriSense intelligence</p>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            {isOffline ? t('offline') : 'Online • live sync ready'}
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4 text-emerald-700" />{t('maps')}</div>
            <p className="mt-2 text-sm text-slate-500">Geo-tagged farms and route-based field planning.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-slate-700"><Waves className="h-4 w-4 text-emerald-700" />{t('soil')}</div>
            <p className="mt-2 text-sm text-slate-500">Soil analysis and irrigation guidance from sensor or image input.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-slate-700"><Leaf className="h-4 w-4 text-emerald-700" />{t('disease')}</div>
            <p className="mt-2 text-sm text-slate-500">Image-based disease detection with treatment guidance.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
