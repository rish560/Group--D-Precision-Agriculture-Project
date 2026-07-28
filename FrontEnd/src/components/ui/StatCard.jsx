import { Card } from './Card';

export const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <Card className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {Icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
          <Icon className="h-4 w-4" />
        </div>
      )}
    </div>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
    {subtitle && <p className="text-xs text-green-600">{subtitle}</p>}
  </Card>
);
