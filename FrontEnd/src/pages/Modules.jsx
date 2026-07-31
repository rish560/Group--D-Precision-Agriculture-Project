import { Droplets, Leaf, MessageSquare, Radar, Sparkles, SunMedium, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricChart } from '../components/charts/MetricChart';
import { analytics } from '../mock/data';

const moduleCards = [
  { title: 'Weather Monitoring', icon: SunMedium, description: 'Live forecasts, alerts, and rainfall insights.' },
  { title: 'Soil Analysis', icon: Leaf, description: 'Upload sample images and inspect NPK and health scores.' },
  { title: 'AI Disease Detection', icon: Sparkles, description: 'Visual diagnosis with severity and treatment guidance.' },
  { title: 'Water Management', icon: Droplets, description: 'Track pumps, irrigation status, and consumption trends.' },
  { title: 'Market Prices', icon: TrendingUp, description: 'Current crop pricing and trend comparison.' },
  { title: 'Chat Assistant', icon: MessageSquare, description: 'Ask the AI assistant about irrigation, weather, and fertilizer.' },
];

const trendData = [
  { name: 'Jan', value: 24 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 31 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 41 },
  { name: 'Jun', value: 46 },
];

const pieData = [
  { name: 'Irrigation', value: 36 },
  { name: 'Fertilizer', value: 24 },
  { name: 'Labor', value: 20 },
  { name: 'Storage', value: 20 },
];

export const ModulesPage = () => {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Smart modules</p>
            <h2 className="text-2xl font-semibold text-slate-900">Precision agriculture capabilities</h2>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><Radar className="h-5 w-5" /></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleCards.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Analytics overview</p>
          <MetricChart type="line" data={trendData} dataKey="value" color="#10b981" />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Revenue trend: {analytics.revenue.at(-1)}% above forecast</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Water usage: {analytics.waterUsage.at(-1)}% of target</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Farm performance: {analytics.farmPerformance.at(-1)}%</div>
          </div>
        </Card>
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Expense mix</p>
          <MetricChart type="pie" data={pieData} dataKey="value" color="#059669" />
        </Card>
      </div>
    </div>
  );
};
