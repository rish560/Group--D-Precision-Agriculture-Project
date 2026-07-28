import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';

export const RoleWorkspace = ({ eyebrow, title, summary, stats, actions }) => (
  <div className="space-y-6">
    <Card className="border-emerald-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(236,253,245,0.92))]">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{summary}</p>
    </Card>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ title: label, value, icon }) => <StatCard key={label} title={label} value={value} subtitle="Live workspace metric" icon={icon} />)}
    </div>
    <Card className="space-y-4">
      <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Quick work</p><h3 className="mt-2 text-xl font-semibold text-slate-900">Open a workspace</h3></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ label, to, icon: Icon }) => <Link key={to} to={to} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"><Icon className="h-5 w-5 text-emerald-700" /><p className="mt-3">{label}</p></Link>)}
      </div>
    </Card>
  </div>
);
