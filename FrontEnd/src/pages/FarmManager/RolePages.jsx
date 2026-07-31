import { Activity, ClipboardList, Tractor, UserRound, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { useAuth } from '../../context/AuthContext';
import { getCrops, getFarms } from '../../services/mockApi';

export const ManagerFarmsPage = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms().then((data) => setFarms(data || [])).catch(() => setFarms([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Operational Farms" value={farms.length.toString()} subtitle="Healthy and monitored" icon={Tractor} />
        <StatCard title="Total Farms Managed" value={farms.length.toString()} subtitle="Fields under supervision" icon={UserRound} />
      </div>
      <Card className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Farm catalog</p>
        <div className="space-y-3">
          {farms.length ? farms.map((farm) => (
            <div key={farm.id || farm.farmId} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{farm.name || farm.farmName}</p>
                <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">{farm.status || 'Active'}</span>
              </div>
              <p className="mt-2 text-gray-500">Location: {farm.location || 'N/A'} {farm.area ? `· Area: ${farm.area}` : ''} {farm.currentCrop ? `· Crop: ${farm.currentCrop}` : ''}</p>
            </div>
          )) : (
            <div className="py-8 text-center text-sm text-gray-500">No farms registered yet.</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export const ManagerCropsPage = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    getCrops().then((data) => setCrops(data || [])).catch(() => setCrops([]));
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Crop operations</p>
      <div className="grid gap-4 md:grid-cols-2">
        {crops.length ? crops.map((crop) => (
          <div key={crop.id || crop.cropId} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold text-gray-900">{crop.name || crop.cropName}</p>
            <p className="mt-2 text-gray-500">Stage: {crop.stage || '—'} · Health: {crop.health || '—'}</p>
          </div>
        )) : (
          <div className="py-8 text-center text-sm text-gray-500 md:col-span-2">No crops registered yet.</div>
        )}
      </div>
    </Card>
  );
};

export const ManagerWorkersPage = () => (
  <Card className="space-y-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Worker management</p>
    <div className="py-8 text-center text-sm text-gray-500">No worker shifts assigned yet.</div>
  </Card>
);

export const ManagerReportsPage = () => (
  <Card className="space-y-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Reports</p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
        <div className="flex items-center gap-2 font-medium text-gray-900"><ClipboardList className="h-4 w-4 text-green-600" /> Daily task summary</div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
        <div className="flex items-center gap-2 font-medium text-gray-900"><Activity className="h-4 w-4 text-green-600" /> Field performance summary</div>
      </div>
    </div>
  </Card>
);

export const ManagerProfilePage = () => {
  const { user } = useAuth();
  return (
    <Card className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Manager profile</p>
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 shadow-sm">
        <p className="text-lg font-bold text-gray-900">{user?.fullName || 'Farm Manager'}</p>
        <p className="mt-1 text-gray-500">{user?.email || 'N/A'} {user?.address ? `· ${user.address}` : ''}</p>
        <p className="mt-2 font-medium text-green-600">Role: {user?.role || 'Farm Manager'}</p>
      </div>
    </Card>
  );
};
