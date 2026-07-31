import { Building2, FileText, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { getFarms, getUsers } from '../../services/mockApi';

export const AdminUsersPage = ({ roleFilter }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">User administration</p>
      <div className="space-y-3">
        {users.filter((user) => !roleFilter || user.role === roleFilter).map((user) => (
          <div key={user.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            {user.fullName} • Role: {user.role}
          </div>
        ))}
      </div>
    </Card>
  );
};

export const AdminFarmsPage = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms().then(setFarms);
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Farm inventory</p>
      <div className="grid gap-4 md:grid-cols-2">
        {farms.map((farm) => (
          <div key={farm.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{farm.name}</p>
            <p className="mt-2">{farm.location} • {farm.area} • Crop: {farm.currentCrop}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const AdminReportsPage = () => (
  <Card className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Reports</p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-700" /> Analytics report</div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-700" /> Security audit</div>
      </div>
    </div>
  </Card>
);

export const AdminSettingsPage = () => (
  <Card className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">System settings</p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><Users className="h-4 w-4 text-emerald-700" /> Role and access controls</div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-emerald-700" /> Enterprise integrations</div>
      </div>
    </div>
  </Card>
);
