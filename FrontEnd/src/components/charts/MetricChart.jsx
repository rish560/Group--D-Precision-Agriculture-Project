const getNumericValue = (item, dataKey) => Number(item?.[dataKey] ?? item?.value ?? 0);

export const MetricChart = ({ type = 'line', data = [], dataKey = 'value', color = '#10b981' }) => {
  if (!data.length) {
    return (
      <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        No chart data available
      </div>
    );
  }

  const values = data.map((item) => getNumericValue(item, dataKey));
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const width = 320;
  const height = 180;
  const padding = 24;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  if (type === 'bar') {
    return (
      <div className="h-56 w-full rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
        <div className="flex h-full items-end justify-between gap-2">
          {data.map((item, index) => {
            const value = getNumericValue(item, dataKey);
            const barHeight = Math.max((value / maxValue) * 100, 8);
            return (
              <div key={`${item.name}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end justify-center rounded-xl bg-slate-100 p-1">
                  <div
                    className="w-full rounded-lg"
                    style={{ height: `${barHeight}%`, backgroundColor: color }}
                  />
                </div>
                <div className="text-center text-xs text-slate-500">
                  <div className="font-medium text-slate-700">{item.name}</div>
                  <div>{value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    let offset = 0;

    return (
      <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="28" />
          {data.map((item, index) => {
            const value = getNumericValue(item, dataKey);
            const segment = (value / total) * circumference;
            const dashArray = `${segment} ${circumference - segment}`;
            const stroke = index % 2 === 0 ? color : '#34d399';
            const circle = (
              <circle
                key={`${item.name}-${index}`}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={stroke}
                strokeWidth="28"
                strokeDasharray={dashArray}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
            offset += segment;
            return circle;
          })}
        </svg>
        <div className="ml-4 space-y-2 text-sm">
          {data.map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: index % 2 === 0 ? color : '#34d399' }}
              />
              <span className="text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const points = data.map((item, index) => {
    const value = getNumericValue(item, dataKey);
    const x = padding + (index / Math.max(data.length - 1, 1)) * innerWidth;
    const y = padding + innerHeight - ((value - minValue) / Math.max(maxValue - minValue, 1)) * innerHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-56 w-full rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
        {data.map((item, index) => {
          const value = getNumericValue(item, dataKey);
          const x = padding + (index / Math.max(data.length - 1, 1)) * innerWidth;
          const y = padding + innerHeight - ((value - minValue) / Math.max(maxValue - minValue, 1)) * innerHeight;
          return (
            <g key={`${item.name}-${index}`}>
              <circle cx={x} cy={y} r="4" fill={color} />
              <text x={x} y={height - 6} textAnchor="middle" fontSize="11" fill="#64748b">
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
