import { Clock3, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

export const ActivityPanel = ({ activities }) => {
  return (
    <Card className="space-y-4 rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Recent activity</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Field operations feed</h3>
        </div>
        <Sparkles className="h-6 w-6 text-emerald-600" />
      </div>
      <div className="space-y-3">
        {activities.slice(0, 5).map((item) => (
          <div key={item.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 shadow-sm transition hover:border-emerald-200 hover:bg-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
