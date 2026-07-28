import { ArrowLeft, Eye, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingState } from '../components/ui/LoadingState';
import { normalizeRole } from '../config/roleRoutes';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Import from custom API modules
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import { getFarms, createFarm, updateFarm, deleteFarm } from '../api/farmApi';
import { getCrops, createCrop, updateCrop, deleteCrop } from '../api/cropApi';

const apis = {
  users: { load: getUsers, create: createUser, update: updateUser, delete: deleteUser },
  farms: { load: getFarms, create: createFarm, update: updateFarm, delete: deleteFarm },
  crops: { load: getCrops, create: createCrop, update: updateCrop, delete: deleteCrop },
};

const tableColumns = {
  farms: [
    ['name', 'Farm Name'],
    ['location', 'Location'],
    ['area', 'Area'],
    ['currentCrop', 'Crop'],
    ['waterSource', 'Water Source'],
    ['status', 'Status']
  ],
  crops: [
    ['name', 'Crop Name'],
    ['farm', 'Farm'],
    ['stage', 'Growth Stage'],
    ['health', 'Crop Health'],
    ['expectedYield', 'Expected Yield']
  ],
  users: [
    ['fullName', 'Full Name'],
    ['email', 'Email'],
    ['role', 'Role'],
    ['phone', 'Phone Number']
  ]
};

const filtersList = {
  farms: ['Healthy', 'Monitoring', 'Optimized'],
  crops: ['Excellent', 'Stable', 'Watch', 'Critical'],
  users: ['Admin', 'Farm Manager', 'Guest']
};

const farmFields = [
  { name: 'name', label: 'Farm Name', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'currentCrop', label: 'Crop / Current Crop', type: 'text' },
  { name: 'area', label: 'Area (e.g. 48 acres)', type: 'text', required: true },
  { name: 'waterSource', label: 'Water Source', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['Healthy', 'Monitoring', 'Optimized'], defaultValue: 'Healthy' }
];

const cropFields = [
  { name: 'name', label: 'Crop Name', type: 'text', required: true },
  { name: 'farm', label: 'Assigned Farm', type: 'select', options: [], required: true },
  { name: 'stage', label: 'Growth Stage', type: 'select', options: ['Seeding', 'Vegetative', 'Flowering', 'Maturity', 'Harvested'], defaultValue: 'Vegetative' },
  { name: 'health', label: 'Crop Health', type: 'select', options: ['Excellent', 'Stable', 'Watch', 'Critical'], defaultValue: 'Excellent' },
  { name: 'plantingDate', label: 'Planting Date', type: 'date', required: true },
  { name: 'expectedYield', label: 'Expected Yield', type: 'text', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Archived', 'Harvested'], defaultValue: 'Active' }
];

const userFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Farm Manager', 'Guest'], required: true },
  { name: 'phone', label: 'Phone Number', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' }
];

export const RecordManagement = ({ resource, canManage = false, roleFilter, title }) => {
  const apiSetup = apis[resource];
  const columns = tableColumns[resource];
  const filters = filtersList[resource];

  const location = useLocation();
  const isAddRoute = location.pathname.endsWith('add-farm') || location.pathname.endsWith('add-crop');

  const { user } = useAuth();
  const { addToast } = useToast();

  const currentRole = normalizeRole(user?.role);
  const isAdmin = currentRole === 'ADMIN';
  const isFarmer = currentRole === 'FARMER' || currentRole === 'FARM_MANAGER';
  const isGuest = currentRole === 'GUEST' || currentRole === 'USER' || (!isAdmin && !isFarmer);

  // ── State declarations (ALL useState calls must come before any useCallback/useMemo that reference them) ──
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(isAddRoute ? 'create' : null);
  const [saving, setSaving] = useState(false);
  // farmsList MUST be declared before isOwnRecord uses it in its body and dependency array
  const [farmsList, setFarmsList] = useState([]);

  // ── Ownership check (uses farmsList, so declared AFTER farmsList state) ──
  const isOwnRecord = useCallback(
    (item) => {
      if (!item || !user) return false;
      if (isAdmin) return true;
      if (isGuest) return false;

      const userIdStr = String(user.id || '').toLowerCase();
      const userNameStr = String(user.fullName || user.name || '').toLowerCase().trim();
      const userEmailStr = String(user.email || '').toLowerCase().trim();

      const checkFields = [
        item.createdBy,
        item.userId,
        item.user_id,
        item.farmerId,
        item.farmer_id,
        item.owner,
        item.manager,
        item.farmer,
        item.farmerName,
      ];

      for (const val of checkFields) {
        if (val === undefined || val === null || val === '') continue;
        const sVal = String(val).toLowerCase().trim();
        if (
          (userIdStr && sVal === userIdStr) ||
          (userEmailStr && sVal === userEmailStr) ||
          (userNameStr && (sVal === userNameStr || sVal.includes(userNameStr) || userNameStr.includes(sVal)))
        ) {
          return true;
        }
      }

      // Safe: farmsList is guaranteed to be an array (initialized as [])
      if (resource === 'crops' && item.farm && Array.isArray(farmsList)) {
        const cropFarmName = String(item.farm).toLowerCase().trim();
        const belongsToOwnedFarm = farmsList.some((farm) => {
          const farmName = String(farm.name || farm.farmName || '').toLowerCase().trim();
          const farmOwner = String(farm.owner || farm.manager || '').toLowerCase().trim();
          return (
            farmName === cropFarmName &&
            ((userIdStr && farmOwner.includes(userIdStr)) ||
              (userNameStr && farmOwner.includes(userNameStr)) ||
              (userEmailStr && farmOwner.includes(userEmailStr)))
          );
        });
        if (belongsToOwnedFarm) return true;
      }

      return false;
    },
    [isAdmin, isGuest, user, resource, farmsList]
  );

  const canAdd = resource === 'users' ? isAdmin : (isAdmin || isFarmer);

  const canEdit = useCallback(
    (item) => {
      if (resource === 'users') return isAdmin;
      return isAdmin || (isFarmer && isOwnRecord(item));
    },
    [isAdmin, isFarmer, resource, isOwnRecord]
  );

  const canDelete = useCallback(
    (item) => {
      if (resource === 'users') return isAdmin;
      return isAdmin || (isFarmer && isOwnRecord(item));
    },
    [isAdmin, isFarmer, resource, isOwnRecord]
  );

  // ── Effects ──
  useEffect(() => {
    if (isAddRoute) {
      setMode('create');
    }
  }, [isAddRoute]);

  useEffect(() => {
    if (resource === 'crops') {
      getFarms().then(setFarmsList).catch(() => {});
    }
  }, [resource]);

  // ── Fields config (depends on farmsList) ──
  const fieldsConfig = useMemo(() => {
    if (resource === 'farms') return farmFields;
    if (resource === 'users') return userFields;
    if (resource === 'crops') {
      return cropFields.map((f) => {
        if (f.name === 'farm') {
          return { ...f, options: (farmsList || []).map((farm) => farm.name) };
        }
        return f;
      });
    }
    return [];
  }, [resource, farmsList]);

  const blankRecord = useCallback(() => {
    const obj = {};
    (fieldsConfig || []).forEach((f) => {
      obj[f.name] = f.defaultValue || '';
    });
    return obj;
  }, [fieldsConfig]);

  // record state: initialized safely — blankRecord() is callable immediately since fieldsConfig defaults to []
  const [record, setRecord] = useState(() => (isAddRoute ? blankRecord() : {}));

  useEffect(() => {
    if (isAddRoute) {
      setRecord(blankRecord());
    }
  }, [isAddRoute, blankRecord]);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiSetup.load();
      setRecords(data);
    } catch {
      addToast(`Unable to load ${resource}.`, 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast, resource, apiSetup]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const visibleRecords = useMemo(() => {
    if (!records) return [];
    let list = records;
    if (roleFilter) {
      list = list.filter((r) => String(r.role).toLowerCase() === roleFilter.toLowerCase());
    }
    if (filter !== 'All') {
      list = list.filter((r) => r.status === filter || r.health === filter || r.role === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        Object.values(r).some((val) => String(val || '').toLowerCase().includes(q))
      );
    }
    return list;
  }, [records, roleFilter, filter, search]);

  const PAGE_SIZE = 6;
  const pages = Math.max(1, Math.ceil(visibleRecords.length / PAGE_SIZE));
  const rows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return visibleRecords.slice(start, start + PAGE_SIZE);
  }, [visibleRecords, page]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === 'create') {
        const savePayload = { ...record };
        if (user) {
          if (!savePayload.createdBy) savePayload.createdBy = user.id || user.email || user.fullName;
          if (!savePayload.userId) savePayload.userId = user.id;
          if (!savePayload.owner && isFarmer) savePayload.owner = user.fullName;
          if (!savePayload.manager && isFarmer) savePayload.manager = user.fullName;
        }
        await apiSetup.create(savePayload);
      } else {
        await apiSetup.update(record.id, record);
      }
      addToast(`${resource.slice(0, -1)} ${mode === 'create' ? 'created' : 'updated'} successfully.`, 'success');
      setMode(null);
      await loadRecords();
    } catch {
      addToast(`Unable to save record.`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setSaving(true);
    try {
      await apiSetup.delete(record.id);
      addToast(`${resource.slice(0, -1)} deleted successfully.`, 'success');
      setMode(null);
      await loadRecords();
    } catch {
      addToast(`Unable to delete record.`, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label={`Loading ${title || `${resource} records`}...`} />;

  // Dedicated Page view for Add/Edit/View Form instead of popup modal
  if (mode) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setMode(null)}
              className="gap-1.5 text-xs px-3 py-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> View all {resource}
            </Button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                {mode === 'delete' ? 'Confirm deletion' : `${mode} ${resource.slice(0, -1)}`}
              </p>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? `Add ${resource.slice(0, -1)}` : (record.name || record.fullName || 'Record Details')}
              </h2>
            </div>
          </div>
        </div>

        <Card>
          {mode === 'delete' && canDelete(record) ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this {resource.slice(0, -1)} record? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                <Button variant="secondary" onClick={() => setMode(null)}>Cancel</Button>
                <Button variant="danger" disabled={saving} onClick={handleRemove}>
                  {saving ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          ) : mode === 'view' ? (
            <div className="space-y-6">
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {fieldsConfig.map((f) => (
                  <div key={f.name} className={`rounded-lg border border-gray-100 bg-gray-50 p-3.5 ${f.colSpan === 2 ? 'sm:col-span-2' : ''}`}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">{f.label}</dt>
                    <dd className="mt-1 font-medium text-gray-900 break-words whitespace-pre-line text-sm">
                      {record[f.name] || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex justify-end border-t border-gray-100 pt-4">
                <Button variant="secondary" onClick={() => setMode(null)}>Back to list</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {fieldsConfig.map((f) => {
                  const isColSpan2 = f.colSpan === 2;
                  const isLockedForManager = isFarmer && (f.name === 'manager' || f.name === 'owner');
                  return (
                    <div key={f.name} className={isColSpan2 ? 'sm:col-span-2' : ''}>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                        {isLockedForManager && (
                          <span className="ml-2 text-xs font-normal text-gray-400">(auto-assigned)</span>
                        )}
                      </label>
                      {f.type === 'textarea' ? (
                        <textarea
                          required={f.required}
                          value={record[f.name] || ''}
                          onChange={(e) => setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white min-h-24"
                          placeholder={`Enter ${f.label.toLowerCase()}`}
                        />
                      ) : f.type === 'select' ? (
                        <select
                          required={f.required}
                          value={record[f.name] || ''}
                          onChange={(e) => setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                        >
                          <option value="">Select {f.label}</option>
                          {f.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={f.type}
                          required={f.required}
                          value={isLockedForManager ? (user?.fullName || '') : (record[f.name] || '')}
                          readOnly={isLockedForManager}
                          onChange={(e) => !isLockedForManager && setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition ${
                            isLockedForManager
                              ? 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white'
                          }`}
                          placeholder={isLockedForManager ? user?.fullName : `Enter ${f.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <Button variant="secondary" type="button" onClick={() => setMode(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="px-6">
                  {saving ? 'Saving...' : `Save ${resource.slice(0, -1)}`}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Operations center</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-900">{title || `${resource} management`}</h2>
            <p className="mt-1 text-sm text-gray-500">Search, filter, view, and manage records securely.</p>
          </div>
          {canAdd && (
            <Button onClick={() => { setRecord(blankRecord()); setMode('create'); }}>
              <Plus className="mr-2 h-4 w-4" />Add {resource.slice(0, -1)}
            </Button>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
          <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              aria-label={`Search ${resource}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
              placeholder={`Search ${resource}...`}
            />
          </label>
          <select
            aria-label={`Filter ${resource}`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none"
          >
            <option>All</option>
            {filters.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {/* Desktop / tablet: table (hidden on small screens) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-[760px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {columns.map(([, label]) => (
                  <th key={label} className="border-b border-gray-200 px-5 py-3.5 font-medium whitespace-nowrap">{label}</th>
                ))}
                <th className="border-b border-gray-200 px-5 py-3.5 font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {columns.map(([key]) => (
                    <td key={key} className="border-b border-gray-100 px-5 py-3.5 max-w-[220px] truncate" title={String(item[key] || '')}>
                      {key === 'status' || key === 'health' ? (
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ['Healthy', 'Excellent', 'Active'].includes(item[key]) 
                            ? 'bg-green-50 text-green-700' 
                            : ['Monitoring', 'Stable'].includes(item[key]) 
                            ? 'bg-amber-50 text-amber-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {item[key] || '—'}
                        </span>
                      ) : (
                        item[key] || '—'
                      )}
                    </td>
                  ))}
                  <td className="border-b border-gray-100 px-5 py-3.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label={`View ${resource.slice(0, -1)}`}
                        onClick={() => { setRecord(item); setMode('view'); }}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {canEdit(item) && (
                        <button
                          type="button"
                          aria-label={`Edit ${resource.slice(0, -1)}`}
                          onClick={() => { setRecord(item); setMode('edit'); }}
                          className="rounded-lg border border-green-200 p-1.5 text-green-700 hover:bg-green-50 transition"
                          title="Edit record"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {canDelete(item) && (
                        <button
                          type="button"
                          aria-label={`Delete ${resource.slice(0, -1)}`}
                          onClick={() => { setRecord(item); setMode('delete'); }}
                          className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 transition"
                          title="Delete record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-gray-500">
                    No records found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards (shown only on small screens) */}
        <div className="sm:hidden divide-y divide-gray-100">
          {rows.map((item) => (
            <div key={item.id} className="p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-gray-900 break-words">
                  {item[columns[0][0]] || '—'}
                </p>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    aria-label={`View ${resource.slice(0, -1)}`}
                    onClick={() => { setRecord(item); setMode('view'); }}
                    className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {canEdit(item) && (
                    <button
                      type="button"
                      aria-label={`Edit ${resource.slice(0, -1)}`}
                      onClick={() => { setRecord(item); setMode('edit'); }}
                      className="rounded-lg border border-green-200 p-1.5 text-green-700 hover:bg-green-50 transition"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  {canDelete(item) && (
                    <button
                      type="button"
                      aria-label={`Delete ${resource.slice(0, -1)}`}
                      onClick={() => { setRecord(item); setMode('delete'); }}
                      className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                {columns.slice(1).map(([key, label]) => (
                  <div key={key} className="min-w-0">
                    <dt className="text-gray-400">{label}</dt>
                    <dd className="mt-0.5 font-medium text-gray-700 break-words">
                      {key === 'status' || key === 'health' ? (
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          ['Healthy', 'Excellent', 'Active'].includes(item[key])
                            ? 'bg-green-50 text-green-700'
                            : ['Monitoring', 'Stable'].includes(item[key])
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {item[key] || '—'}
                        </span>
                      ) : (
                        item[key] || '—'
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          {!rows.length && (
            <p className="px-5 py-12 text-center text-gray-500 text-sm">
              No records found matching current criteria.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-4 text-sm border-t border-gray-100">
          <span className="text-gray-500">{visibleRecords.length} records</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled={page === 1} onClick={() => setPage((v) => v - 1)} className="px-3 py-1.5 text-xs">
              Previous
            </Button>
            <span className="text-gray-600 text-xs font-medium">Page {page} of {pages}</span>
            <Button variant="secondary" disabled={page === pages} onClick={() => setPage((v) => v + 1)} className="px-3 py-1.5 text-xs">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
