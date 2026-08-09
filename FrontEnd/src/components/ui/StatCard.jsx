import { Link } from 'react-router-dom';
import { Card } from './Card';

export const StatCard = ({ title, value, subtitle, icon: Icon, to }) => {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      {subtitle && <p className="text-xs text-green-600 dark:text-green-400">{subtitle}</p>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block transition hover:-translate-y-0.5">
        <Card className="flex flex-col gap-3 cursor-pointer hover:border-emerald-200 dark:hover:border-emerald-500/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-500/5">
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card className="flex flex-col gap-3">
      {content}
    </Card>
  );
};
