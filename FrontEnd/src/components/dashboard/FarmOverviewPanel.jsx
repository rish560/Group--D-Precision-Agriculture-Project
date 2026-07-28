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
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Farm overview</p>
          <h3 className="mt-1 text-base font-semibold text-gray-900">Managed fields at a glance</h3>
        </div>
        <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
          {farms.length} sites
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {metrics.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <Icon className="h-3.5 w-3.5" /> {label}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {farms.slice(0, 2).map((farm) => (
          <div key={farm.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{farm.name}</p>
                <p className="mt-0.5 text-xs text-gray-500">{farm.location} · {farm.area}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                farm.status === 'Healthy' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {farm.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-gray-600">
              <div>
                <p className="font-medium text-gray-500">Crop</p>
                <p className="mt-0.5 font-semibold text-gray-900">{farm.currentCrop}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Health</p>
                <p className="mt-0.5 font-semibold text-gray-900">{farm.healthScore}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Water</p>
                <p className="mt-0.5 font-semibold text-gray-900">{farm.waterSource}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
