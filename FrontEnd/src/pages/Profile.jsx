import { CalendarDays, KeyRound, Mail, MapPin, Pencil, Phone, ShieldCheck, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const inputClass =
  'mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const profile = user || {
    fullName: 'Guest User',
    email: 'guest@farmverse.com',
    role: 'Guest',
    phone: '',
    address: '',
    joinedAt: '14 July 2026',
  };

  const [dialog, setDialog] = useState(null);
  const [draft, setDraft] = useState(profile);

  const details = [
    [UserCircle, 'Full Name', profile.fullName],
    [Mail, 'Email', profile.email],
    [ShieldCheck, 'Role', profile.role],
    [Phone, 'Phone Number', profile.phone || 'Not provided'],
    [MapPin, 'Address', profile.address || 'Not provided'],
    [CalendarDays, 'Join Date', profile.joinedAt || 'Account active'],
  ];

  const save = (e) => {
    e.preventDefault();
    updateProfile(draft);
    setDialog(null);
    addToast(
      dialog === 'password' ? 'Password updated successfully.' : 'Profile updated successfully.',
      'success',
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <Card className="overflow-hidden p-0">
        {/* Cover */}
        <div className="relative h-40 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80"
            alt="Agriculture field"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
        </div>

        <div className="relative px-6 pb-6 pt-4 sm:px-8">
          {/* Avatar */}
          <div className="absolute -top-8 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-green-50 text-green-600 shadow-md sm:left-8">
            <UserCircle className="h-10 w-10" />
          </div>

          <div className="flex flex-col justify-between gap-4 pt-10 sm:flex-row sm:items-center sm:pt-4">
            <div>
              <p className="text-lg font-bold text-gray-900">{profile.fullName}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => { setDraft(profile); setDialog('profile'); }}
                className="gap-1.5 px-3.5 py-2 text-sm"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit Profile
              </Button>
              <Button
                variant="secondary"
                onClick={() => setDialog('password')}
                className="gap-1.5 px-3.5 py-2 text-sm"
              >
                <KeyRound className="h-3.5 w-3.5" /> Change Password
              </Button>
            </div>
          </div>

          {/* Details grid */}
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {details.map(([Icon, label, value]) => (
              <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon className="h-3.5 w-3.5 text-green-600" />
                  {label}
                </div>
                <p className="mt-1.5 font-medium text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Edit modal */}
      {dialog && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
        >
          <Card className="w-full max-w-md" hover={false}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                  Account settings
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">
                  {dialog === 'profile' ? 'Edit Profile' : 'Change Password'}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setDialog(null)}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={save} className="mt-5 space-y-4">
              {dialog === 'profile' ? (
                <>
                  {[
                    ['fullName', 'Full name'],
                    ['phone', 'Phone number'],
                    ['address', 'Address'],
                  ].map(([key, label]) => (
                    <label key={key} className="block text-sm font-medium text-gray-700">
                      {label}
                      <input
                        required
                        value={draft[key] || ''}
                        onChange={(e) => setDraft((curr) => ({ ...curr, [key]: e.target.value }))}
                        className={inputClass}
                      />
                    </label>
                  ))}
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Current password
                    <input required type="password" className={inputClass} />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    New password
                    <input required minLength={8} type="password" className={inputClass} />
                  </label>
                </>
              )}
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                <Button variant="secondary" type="button" onClick={() => setDialog(null)} className="px-4 py-2 text-sm">
                  Cancel
                </Button>
                <Button type="submit" className="px-4 py-2 text-sm">
                  Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
