import { FileText, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricChart } from '../components/charts/MetricChart';
import { useLanguage } from '../context/LanguageContext';

export const ReportsPage = () => {
  const { t } = useLanguage();

  const chartData = [
    { name: t('chartYield'), value: 92 },
    { name: t('chartWater'), value: 81 },
    { name: t('chartSoil'), value: 89 },
    { name: t('chartRevenue'), value: 94 },
  ];

  const reports = [
    { id: 1, title: t('farmReportTitle'), summary: t('farmReportSummary'), range: 'Apr 2026' },
    { id: 2, title: t('cropReportTitle'), summary: t('cropReportSummary'), range: t('rangeThisQuarter') },
    { id: 3, title: t('waterUsageReportTitle'), summary: t('waterUsageReportSummary'), range: t('rangeLast60Days') },
  ];

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('reportsCenter')}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <div key={report.id} className="rounded-[1.5rem] border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-700 dark:text-gray-300">
              <div className="flex items-center gap-2 text-emerald-700">
                <FileText className="h-4 w-4" />
                <p className="font-semibold text-slate-900 dark:text-gray-100">{report.title}</p>
              </div>
              <p className="mt-2">{report.summary}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-400">{report.range}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('performanceOverview')}</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100">{t('operationalMaturityScorecard')}</h3>
            </div>
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 p-3 text-emerald-700"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <MetricChart type="bar" data={chartData} dataKey="value" color="#34d399" />
        </Card>
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('operationalSnapshot')}</p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-gray-300">{t('revenueTrendInsight')}</div>
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-gray-300">{t('waterUsageInsight')}</div>
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-gray-300">{t('farmPerformanceInsight')}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
