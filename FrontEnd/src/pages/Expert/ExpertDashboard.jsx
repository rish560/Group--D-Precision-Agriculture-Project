import { Activity, AlertTriangle, MessageSquare, Stethoscope, SunMedium, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { getNotifications, getUsers, getWeather } from '../../services/mockApi';

export const ExpertDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [weather, setWeather] = useState(null);
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    Promise.all([getNotifications(), getWeather(), getUsers()]).then(([notificationsData, weatherData, usersData]) => {
      setNotifications(notificationsData);
      setWeather(weatherData);
      setFarmers(usersData.filter((user) => user.role === 'Farmer'));
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Today's Consultations" value="18" subtitle="Across high-risk farms" icon={Users} />
        <StatCard title="Disease Cases" value={notifications.filter((note) => note.title.toLowerCase().includes('disease')).length || 7} subtitle="Need immediate review" icon={AlertTriangle} />
        <StatCard title="Pending Requests" value={notifications.length} subtitle="Awaiting expert action" icon={Activity} />
        <StatCard title="Weather Alerts" value={weather?.alerts?.length ?? 0} subtitle="Severe conditions" icon={SunMedium} />
      </div>

      <Card className="overflow-hidden border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(236,253,245,0.9))] p-0">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Expert actions</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Guidance that stays proactive and precise.</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">Review disease indicators, respond to consultation requests, and share actionable advice from one polished workspace.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Upload Recommendations', 'Create Advisory', 'View Crop Images', 'Disease Analysis'].map((item) => <button key={item} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200">{item}</button>)}
            </div>
          </div>
          <div className="min-h-[220px]">
            <img src="https://images.unsplash.com/photo-1598514982902-7f24876e69e2?auto=format&fit=crop&w=1200&q=80" alt="Agriculture expert reviewing field data" className="h-full w-full object-cover" />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-4 border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(240,253,244,0.9))]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Live insights</p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow-sm"><span className="font-semibold text-emerald-700">AI suggestion</span> Adjust watering schedule for the western fields.</div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow-sm"><span className="font-semibold text-emerald-700">Risk report</span> Two farms show high fungal stress.</div>
          </div>
        </Card>
        <Card className="space-y-4 border-slate-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(248,250,252,0.95))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Live chat</p>
              <h3 className="text-xl font-semibold text-slate-900">Support center</h3>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700"><MessageSquare className="h-5 w-5" /></div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-700 shadow-sm">Open a consultation request, share crop images, or review advisory notes.</div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4 border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(240,253,244,0.9))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Assigned farmers</p>
              <h3 className="text-xl font-semibold text-slate-900">Field cases and consults</h3>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><Stethoscope className="h-5 w-5" /></div>
          </div>
          <div className="space-y-3">
            {farmers.map((farmer) => (
              <div key={farmer.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow-sm">
                <span className="font-medium text-slate-800">{farmer.fullName}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">Disease review pending</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-4 border-amber-100/80 bg-[linear-gradient(135deg,_rgba(255,251,235,0.95),_rgba(255,255,255,0.95))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Priority alerts</p>
              <h3 className="text-xl font-semibold text-slate-900">Need attention now</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow-sm">Leaf blight risk increasing in two northern plots.</div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow-sm">Recommended irrigation adjustment before evening.</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
