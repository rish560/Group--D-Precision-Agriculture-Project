import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';

export const RoleWorkspace = ({ eyebrow, title, summary, stats, actions }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <Card className="border-emerald-100 dark:border-emerald-500/30 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(236,253,245,0.92))] dark:bg-[linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(6,78,59,0.35))]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-gray-100">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-gray-400">{summary}</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title: label, value, icon, to }) => <StatCard key={label} title={label} value={value} subtitle={t('liveWorkspaceMetric')} icon={icon} to={to} />)}
      </div>
      <Card className="space-y-4">
        <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">{t('quickWork')}</p><h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-gray-100">{t('openWorkspace')}</h3></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map(({ label, to, icon: Icon }) => <Link key={to} to={to} className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm font-medium text-slate-700 dark:text-gray-300 transition hover:-translate-y-0.5 hover:border-emerald-200 dark:hover:border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"><Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" /><p className="mt-3">{label}</p></Link>)}
        </div>
      </Card>
    </div>
  );
};
