import { FileText, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricChart } from '../components/charts/MetricChart';
import { reports } from '../mock/data';

const chartData = [
  { name: 'Yield', value: 92 },
  { name: 'Water', value: 81 },
  { name: 'Soil', value: 89 },
  { name: 'Revenue', value: 94 },
];

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Reports center</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <div key={report.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-center gap-2 text-emerald-700">
                <FileText className="h-4 w-4" />
                <p className="font-semibold text-slate-900">{report.title}</p>
              </div>
              <p className="mt-2">{report.summary}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{report.range}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Performance overview</p>
              <h3 className="text-xl font-semibold text-slate-900">Operational maturity scorecard</h3>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <MetricChart type="bar" data={chartData} dataKey="value" color="#34d399" />
        </Card>
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Operational snapshot</p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Revenue trend: 88% above the prior quarter.</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Water usage fell by 12% after the drip irrigation adoption.</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">Farm performance improved steadily across all active plots.</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
