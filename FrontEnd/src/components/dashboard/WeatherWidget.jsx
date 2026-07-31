import { CloudRain, Droplets, Wind, SunMedium } from 'lucide-react';
import { Card } from '../ui/Card';

export const WeatherWidget = ({ weather }) => {
  return (
    <Card className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-5 shadow-lg shadow-emerald-100/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Weather</p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">{weather?.location ?? 'Loading location'}</h3>
          <p className="mt-2 max-w-xl text-sm text-slate-600">Live conditions and forecast for your managed fields.</p>
        </div>
        <div className="grid gap-2 rounded-[1.5rem] bg-emerald-600/10 p-3 text-emerald-900 shadow-inner shadow-emerald-100/80">
          <span className="text-5xl font-semibold">{weather?.current?.temp ?? '--'}°</span>
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-900/90"><SunMedium className="h-4 w-4" />{weather?.current?.condition ?? 'N/A'}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.4rem] bg-white/90 p-4 text-sm shadow-sm">
          <p className="text-slate-500">Humidity</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{weather?.current?.humidity ?? '--'}%</p>
        </div>
        <div className="rounded-[1.4rem] bg-white/90 p-4 text-sm shadow-sm">
          <p className="text-slate-500">Rain chance</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{weather?.current?.rainfall ?? '--'}%</p>
        </div>
        <div className="rounded-[1.4rem] bg-white/90 p-4 text-sm shadow-sm">
          <p className="text-slate-500">Wind speed</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{weather?.current?.windSpeed ?? '--'} km/h</p>
        </div>
        <div className="rounded-[1.4rem] bg-white/90 p-4 text-sm shadow-sm">
          <p className="text-slate-500">UV index</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{weather?.current?.uvIndex ?? '--'}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {weather?.forecast?.slice(0, 3).map((day) => (
          <div key={day.day} className="rounded-[1.4rem] bg-slate-900/5 p-4 text-sm">
            <p className="font-semibold text-slate-900">{day.day}</p>
            <p className="mt-1 text-slate-500">{day.condition}</p>
            <div className="mt-3 flex items-center justify-between text-slate-700">
              <span>{day.high}°</span>
              <span>{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
