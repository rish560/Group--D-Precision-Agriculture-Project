export const SkeletonCard = ({ rows = 4, className = '' }) => {
  return (
    <div className={`animate-pulse rounded-[1.6rem] bg-slate-100/80 p-6 shadow-sm ${className}`}>
      <div className="mb-4 h-6 w-3/5 rounded-full bg-slate-200" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-4 rounded-full bg-slate-200" />
        ))}
      </div>
    </div>
  );
};
