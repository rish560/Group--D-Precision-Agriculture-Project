import { BellRing, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export const NotificationsPanel = ({ notifications }) => {
  return (
    <Card className="space-y-4 rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Notifications</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Alerts and reminders</h3>
        </div>
        <BellRing className="h-6 w-6 text-emerald-600" />
      </div>
      <div className="space-y-3">
        {notifications.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${item.unread ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{item.category}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              <p className="mt-2 text-xs text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
