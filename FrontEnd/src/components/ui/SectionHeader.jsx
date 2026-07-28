export const SectionHeader = ({ title, subtitle, badge, action }) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        {badge && (
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600">{badge}</p>
        )}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="max-w-2xl text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action && <div className="mt-2 sm:mt-0">{action}</div>}
    </div>
  );
};
