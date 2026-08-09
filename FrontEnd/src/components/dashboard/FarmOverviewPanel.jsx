import { Layers, MapPin, Seedling } from 'lucide-react';
import { Card } from '../ui/Card';

export const FarmOverviewPanel = ({ farms }) => {
  const totalArea = farms.reduce((sum, farm) => sum + (Number(farm.areaHa) || 0), 0).toFixed(1);

  const metrics = [
    { icon: MapPin, label: 'Location diversity', value: new Set(farms.map((f) => f.location)).size },
    { icon: Seedling, label: 'Total crop types', value: new Set(farms.map((f) => f.currentCrop)).size },
    { icon: Layers, label: 'Total land', value: `${totalArea} ha` },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">Farm overview</p>
          <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">Managed fields at a glance</h3>
        </div>
        <span className="rounded-full border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400">
          {farms.length} sites
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {metrics.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-lg border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 p-3">
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <Icon className="h-3.5 w-3.5" /> {label}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {farms.slice(0, 2).map((farm) => (
          <div key={farm.id} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{farm.name}</p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{farm.location} · {farm.area}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                farm.status === 'Healthy' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'
              }`}>
                {farm.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">Crop</p>
                <p className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100">{farm.currentCrop}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">Health</p>
                <p className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100">{farm.healthScore}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">Water</p>
                <p className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100">{farm.waterSource}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
