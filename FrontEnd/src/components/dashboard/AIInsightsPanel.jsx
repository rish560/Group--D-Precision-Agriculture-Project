import { Sparkles, TrendingUp, Droplets, Leaf } from 'lucide-react';
import { Card } from '../ui/Card';

const insights = [
  {
    title: 'Water usage optimized',
    description: 'Drip irrigation efficiency is up 14% across active plots.',
    icon: Droplets,
  },
  {
    title: 'Crop performance uplift',
    description: 'Crop health has improved due to adaptive nutrient scheduling.',
    icon: TrendingUp,
  },
  {
    title: 'Soil condition stable',
    description: 'Soil pH remains within optimal range after recent amendments.',
    icon: Leaf,
  },
  {
    title: 'Proactive alerts ready',
    description: 'Disease and weather advisories are being monitored in real time.',
    icon: Sparkles,
  },
];

export const AIInsightsPanel = () => {
  return (
    <Card className="space-y-5 rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">AI insights</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">Actionable intelligence for your fields</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.title} className="rounded-[1.5rem] border border-slate-100 bg-emerald-50/60 p-4 shadow-sm transition hover:-translate-y-1 hover:bg-emerald-50">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{insight.title}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{insight.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
