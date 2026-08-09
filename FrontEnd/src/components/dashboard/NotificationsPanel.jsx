import { BellRing, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

const NOTIF_KEYS = {
  1: { title: 'notif1Title', desc: 'notif1Desc', category: 'notif1Category', time: 'notif1Time' },
  2: { title: 'notif2Title', desc: 'notif2Desc', category: 'notif2Category', time: 'notif2Time' },
  3: { title: 'notif3Title', desc: 'notif3Desc', category: 'notif3Category', time: 'notif3Time' },
  4: { title: 'notif4Title', desc: 'notif4Desc', category: 'notif4Category', time: 'notif4Time' },
};

export const NotificationsPanel = ({ notifications }) => {
  const { t } = useLanguage();

  return (
    <Card className="space-y-4 rounded-[1.7rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 p-5 shadow-lg shadow-slate-200/50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{t('notificationsSetting')}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-gray-100">{t('alertsAndRemindersHeading')}</h3>
        </div>
        <BellRing className="h-6 w-6 text-emerald-600" />
      </div>
      <div className="space-y-3">
        {notifications.slice(0, 4).map((item) => {
          const keys = NOTIF_KEYS[item.id];
          const title = keys ? t(keys.title) : item.title;
          const description = keys ? t(keys.desc) : item.description;
          const category = keys ? t(keys.category) : item.category;
          const time = keys ? t(keys.time) : item.time;
          return (
            <div key={item.id} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 shadow-sm">
              <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${item.unread ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 dark:text-gray-400'}`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-gray-100">{title}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-400">{category}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{description}</p>
                <p className="mt-2 text-xs text-slate-400">{time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

