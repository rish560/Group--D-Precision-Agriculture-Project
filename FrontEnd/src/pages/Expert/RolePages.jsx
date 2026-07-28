import { AlertTriangle, MessageSquare, Stethoscope, SunMedium, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { getNotifications, getUsers, getWeather } from '../../services/mockApi';

export const ExpertFarmersPage = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setFarmers(data.filter((user) => user.role === 'Farmer')));
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Assigned farmers</p>
      <div className="space-y-3">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            {farmer.fullName} • Last advisory: 2 days ago
          </div>
        ))}
      </div>
    </Card>
  );
};

export const ExpertDiseasePage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getWeather().then((data) => setAlerts(data.alerts || []));
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Disease reports</p>
      <div className="space-y-3">
        {alerts.length ? (
          alerts.map((alert) => (
            <div key={alert.type} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{alert.type}</p>
              <p className="mt-2">{alert.message}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">Loading disease insights...</div>
        )}
      </div>
    </Card>
  );
};

export const ExpertRecommendationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Recommendations</p>
      <div className="space-y-3 text-sm text-slate-700">
        {notifications.length ? (
          notifications.map((note) => (
            <div key={note.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{note.title}</p>
              <p className="mt-2">{note.description}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">Loading recommendations...</div>
        )}
      </div>
    </Card>
  );
};

export const ExpertProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUsers().then((data) => setProfile(data.find((user) => user.role === 'Expert')));
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Expert profile</p>
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="text-lg font-semibold text-slate-900">{profile?.fullName ?? 'Loading...'}</p>
        <p className="mt-2">Specialist: {profile?.skills?.join(', ') ?? 'Loading skills'} • {profile?.address ?? 'Loading location'}</p>
        <p className="mt-2">Experience: {profile?.experience ?? '—'} • Active advisory cases: {profile ? 18 : '—'}</p>
      </div>
    </Card>
  );
};
