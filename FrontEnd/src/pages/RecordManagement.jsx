import { ArrowLeft, Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingState } from '../components/ui/LoadingState';
import { normalizeRole } from '../config/roleRoutes';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Import custom API modules
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
    ['farmerName', 'Farmer Name'],
    ['location', 'Location'],
    ['area', 'Area'],
    ['waterSource', 'Water Source'],
    ['status', 'Status']
  ],
  crops: [
    ['farmerName', 'Farmer Name'],
    ['name', 'Crop'],
    ['stage', 'Growth Stage'],
    ['health', 'Crop Health'],
    ['expectedYield', 'Expected Yield']
  ],
  users: [
    ['fullName', 'Full Name'],
    ['email', 'Email'],
    ['role', 'Role'],
    ['phoneNumber', 'Phone Number']  // ← was 'phone'; backend DTO field is 'phoneNumber'
  ]
};

const filtersList = {
  farms: ['Healthy', 'Needs Attention', 'Under Maintenance', 'Inactive'],
  crops: ['Excellent', 'Good', 'Average', 'Poor', 'Diseased'],
  users: ['Admin', 'Farm Manager', 'Guest']
};

export const PRESET_CROPS = [
  'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton', 'Potato', 'Tomato',
  'Onion', 'Mustard', 'Soybean', 'Groundnut', 'Banana', 'Mango', 'Apple', 'Tea'
];

export const AREA_UNITS = ['Acres', 'Hectares', 'Square Meter'];
export const WATER_SOURCES = ['Borewell', 'Well', 'Canal', 'River', 'Pond', 'Rainwater', 'Tap Water'];
export const FARM_STATUSES = ['Healthy', 'Needs Attention', 'Under Maintenance', 'Inactive'];

export const GROWTH_STAGES = ['Seeding', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest Ready', 'Maturity'];
export const CROP_HEALTHS = ['Excellent', 'Good', 'Average', 'Poor', 'Diseased'];
export const YIELD_UNITS = ['tons/acre', 'tons/hectare', 'kg/acre', 'quintals/acre'];

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
  const isManager = currentRole === 'FARM_MANAGER';
  const isGuest = currentRole === 'GUEST' || (!isAdmin && !isManager);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(isAddRoute ? 'create' : null);
  const [saving, setSaving] = useState(false);
  const [farmsList, setFarmsList] = useState([]);

  const defaultFarmerName = useMemo(() => {
    return user?.fullName || user?.username || 'Ramesh Kumar';
  }, [user]);

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

      if (resource === 'crops' && item.farm && Array.isArray(farmsList)) {
        const cropFarmName = String(item.farm).toLowerCase().trim();
        const belongsToOwnedFarm = farmsList.some((farm) => {
          const farmName = String(farm.name || farm.farmName || '').toLowerCase().trim();
          const farmOwner = String(farm.owner || farm.manager || farm.farmerName || '').toLowerCase().trim();
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

  const canAdd = resource === 'users' ? isAdmin : (isAdmin || isManager);

  const canEdit = useCallback(
    (item) => {
      if (resource === 'users') return isAdmin;
      return isAdmin || (isManager && isOwnRecord(item));
    },
    [isAdmin, isManager, resource, isOwnRecord]
  );

  const canDelete = useCallback(
    (item) => {
      if (resource === 'users') return isAdmin;
      return isAdmin || (isManager && isOwnRecord(item));
    },
    [isAdmin, isManager, resource, isOwnRecord]
  );

  useEffect(() => {
    if (isAddRoute) {
      setMode('create');
    }
  }, [isAddRoute]);

  const loadFarmsList = useCallback(async () => {
    try {
      const data = await getFarms();
      setFarmsList(data || []);
    } catch {}
  }, []);

  // Initial load of farms list
  useEffect(() => {
    loadFarmsList();
  }, [loadFarmsList]);

  // Re-fetch the latest farms from the backend whenever the crops form becomes
  // active (either via the add-crop route or by switching mode to create/edit).
  // This ensures a newly-added farm is always visible in the Farmer/Farm dropdown
  // without requiring a browser reload.
  useEffect(() => {
    if (resource === 'crops' && isAddRoute) {
      loadFarmsList();
    }
  }, [resource, isAddRoute, loadFarmsList]);

  const getBlankRecord = useCallback((latestFarmsList) => {
    const farms = latestFarmsList || farmsList;
    if (resource === 'farms') {
      return {
        farmerName: defaultFarmerName,
        name: 'Farm',
        location: '',
        numericArea: '',
        areaUnit: 'Acres',
        waterSource: 'Borewell',
        status: 'Healthy',
      };
    }
    if (resource === 'crops') {
      const defaultFarmId = farms && farms.length > 0 ? (farms[0].id || farms[0].farmId) : '';
      return {
        farmerName: defaultFarmerName,
        name: '',
        farmId: defaultFarmId,
        stage: 'Flowering',
        health: 'Good',
        expectedYieldAmount: '',
        expectedYieldUnit: 'tons/acre',
        expectedYield: '',
      };
    }
    return { fullName: '', email: '', role: 'Farm Manager', phoneNumber: '', address: '' };
  }, [resource, farmsList, defaultFarmerName]);

  const [record, setRecord] = useState(() => getBlankRecord());

  useEffect(() => {
    if (isAddRoute) {
      setRecord(getBlankRecord());
    }
  }, [isAddRoute, getBlankRecord]);

  const openCreateModal = async () => {
    // For crops: always refetch the latest farms so the dropdown is up-to-date
    if (resource === 'crops') {
      try {
        const latestFarms = await getFarms();
        setFarmsList(latestFarms || []);
        setRecord(getBlankRecord(latestFarms || []));
      } catch {
        setRecord(getBlankRecord());
      }
    } else {
      setRecord(getBlankRecord());
    }
    setMode('create');
  };

  const openEditModal = (item) => {
    if (resource === 'farms') {
      setRecord({
        ...item,
        farmerName: item.farmerName || item.farmer || item.owner || defaultFarmerName,
        name: item.name || item.farmName || 'Farm',
        location: item.location || '',
        numericArea: item.numericArea != null ? item.numericArea : (item.areaValue != null ? item.areaValue : (item.area ? parseFloat(item.area) || '' : '')),
        areaUnit: item.areaUnit || 'Acres',
        waterSource: item.waterSource || 'Borewell',
        status: item.status || 'Healthy',
      });
    } else if (resource === 'crops') {
      const cropName = item.name || item.cropName || '';
      const yieldStr = String(item.expectedYield || '').trim();
      const yieldParts = yieldStr.split(' ');
      const yieldNum = yieldParts[0] && !isNaN(parseFloat(yieldParts[0])) ? yieldParts[0] : yieldStr;
      const yieldUnit = yieldParts.length > 1 ? yieldParts.slice(1).join(' ') : 'tons/acre';

      setRecord({
        ...item,
        farmerName: item.farmerName || item.farmer || defaultFarmerName,
        name: cropName,
        farmId: item.farmId || (farmsList.find(f => (f.name || f.farmName) === item.farm)?.id) || '',
        stage: item.stage || 'Flowering',
        health: item.health || 'Good',
        expectedYieldAmount: yieldNum,
        expectedYieldUnit: YIELD_UNITS.includes(yieldUnit) ? yieldUnit : 'tons/acre',
        expectedYield: item.expectedYield || '',
      });
    } else {
      setRecord({ ...item });
    }
    setMode('edit');
  };

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

  useEffect(() => {
    setPage(1);
  }, [resource, roleFilter, filter, search]);

  const visibleRecords = useMemo(() => {
    if (!records) return [];
    let list = records;
    if (roleFilter) {
      const normTargetRole = normalizeRole(roleFilter);
      list = list.filter((r) => normalizeRole(r.role) === normTargetRole || r.role === roleFilter);
    }
    if (filter !== 'All') {
      const normFilter = normalizeRole(filter);
      list = list.filter((r) => r.status === filter || r.health === filter || normalizeRole(r.role) === normFilter || r.role === filter);
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

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [page, pages]);

  const rows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return visibleRecords.slice(start, start + PAGE_SIZE);
  }, [visibleRecords, page]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const savePayload = { ...record };

      if (resource === 'farms') {
        if (!savePayload.farmerName || !savePayload.farmerName.trim()) {
          addToast('Farmer Name is required.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.location || !savePayload.location.trim()) {
          addToast('Location is required.', 'error');
          setSaving(false);
          return;
        }
        const numArea = parseFloat(savePayload.numericArea);
        if (isNaN(numArea) || numArea <= 0) {
          addToast('Area must be a number greater than 0.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.areaUnit) {
          addToast('Area Unit is required.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.waterSource) {
          addToast('Water Source is required.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.status) {
          addToast('Status is required.', 'error');
          setSaving(false);
          return;
        }

        savePayload.farmerName = savePayload.farmerName.trim();
        savePayload.farmer = savePayload.farmerName;
        savePayload.farmName = savePayload.name || 'Farm';
        savePayload.area = `${numArea} ${savePayload.areaUnit}`;
        savePayload.numericArea = numArea;
      } else if (resource === 'crops') {
        const finalCropName = (savePayload.name || '').trim();

        if (!finalCropName) {
          addToast('Crop Name is required.', 'error');
          setSaving(false);
          return;
        }
        if (finalCropName.length > 100) {
          addToast('Crop Name must be 100 characters or fewer.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.farmId) {
          addToast('Farm selection is required.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.stage) {
          addToast('Growth Stage is required.', 'error');
          setSaving(false);
          return;
        }
        if (!savePayload.health) {
          addToast('Crop Health is required.', 'error');
          setSaving(false);
          return;
        }

        let finalYield = savePayload.expectedYieldAmount
          ? `${savePayload.expectedYieldAmount} ${savePayload.expectedYieldUnit || ''}`.trim()
          : savePayload.expectedYield;

        if (!finalYield || !finalYield.trim()) {
          addToast('Expected Yield is required.', 'error');
          setSaving(false);
          return;
        }

        savePayload.farmerName = savePayload.farmerName || defaultFarmerName;
        savePayload.farmer = savePayload.farmerName;
        savePayload.name = finalCropName;
        savePayload.cropName = finalCropName;
        savePayload.expectedYield = finalYield;
      }

      if (mode === 'create') {
        if (user) {
          if (!savePayload.createdBy) savePayload.createdBy = user.id || user.email || user.fullName;
          if (!savePayload.userId) savePayload.userId = user.id;
          if (!savePayload.owner) savePayload.owner = savePayload.farmerName || user.fullName;
          if (!savePayload.manager) savePayload.manager = savePayload.farmerName || user.fullName;
        }
        await apiSetup.create(savePayload);
      } else {
        await apiSetup.update(record.id || record.farmId || record.cropId, savePayload);
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
      await apiSetup.delete(record.id || record.farmId || record.cropId);
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
                {mode === 'create' ? `Add ${resource.slice(0, -1)}` : (record.farmerName || record.name || record.fullName || 'Record Details')}
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
                {resource === 'farms' ? (
                  <>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Farmer Name</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.farmerName || record.owner || 'Ramesh Kumar'}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Location</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.location}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Area</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.area}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Water Source</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.waterSource}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Status</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.status}</dd>
                    </div>
                  </>
                ) : resource === 'crops' ? (
                  <>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Farmer Name</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.farmerName || record.farmer || 'Ramesh Kumar'}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Crop</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.name || record.cropName}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Growth Stage</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.stage}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Crop Health</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.health}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Expected Yield</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.expectedYield}</dd>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Full Name</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.fullName}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Email</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.email}</dd>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                      <dt className="text-xs font-semibold uppercase text-gray-400">Role</dt>
                      <dd className="mt-1 font-medium text-gray-900 text-sm">{record.role}</dd>
                    </div>
                  </>
                )}
              </dl>
              <div className="flex justify-end border-t border-gray-100 pt-4">
                <Button variant="secondary" onClick={() => setMode(null)}>Back to list</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {resource === 'farms' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Farmer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={record.farmerName || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, farmerName: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white"
                      placeholder="e.g. Ramesh Kumar"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={record.location || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, location: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white"
                      placeholder="e.g. Kanpur"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0.01"
                      required
                      value={record.numericArea || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, numericArea: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white"
                      placeholder="e.g. 25"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Area Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.areaUnit || 'Acres'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, areaUnit: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      {AREA_UNITS.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Water Source <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.waterSource || 'Borewell'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, waterSource: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      {WATER_SOURCES.map((ws) => (
                        <option key={ws} value={ws}>{ws}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.status || 'Healthy'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, status: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      {FARM_STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {resource === 'crops' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Crop Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={record.name || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, name: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white"
                      placeholder="e.g. Rice, Wheat, Tomato"
                    />
                  </div>


                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Farmer / Farm <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.farmId || ''}
                      onChange={(e) => {
                        const selectedFarm = farmsList.find(f => String(f.id || f.farmId) === String(e.target.value));
                        setRecord((cur) => ({
                          ...cur,
                          farmId: e.target.value,
                          farmerName: selectedFarm ? (selectedFarm.farmerName || selectedFarm.farmer || selectedFarm.owner) : cur.farmerName
                        }));
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      <option value="" disabled>Select Farmer / Farm</option>
                      {farmsList.map((f) => (
                        <option key={f.id || f.farmId} value={f.id || f.farmId}>
                          {f.farmerName || f.farmer || f.owner || f.name} ({f.location || 'Kanpur'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Growth Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.stage || 'Flowering'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, stage: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      {GROWTH_STAGES.map((stg) => (
                        <option key={stg} value={stg}>{stg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Crop Health <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={record.health || 'Good'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, health: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                    >
                      {CROP_HEALTHS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Expected Yield Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        min="0.01"
                        required
                        value={record.expectedYieldAmount || ''}
                        onChange={(e) => setRecord((cur) => ({ ...cur, expectedYieldAmount: e.target.value }))}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white"
                        placeholder="e.g. 4.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Yield Unit <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={record.expectedYieldUnit || 'tons/acre'}
                        onChange={(e) => setRecord((cur) => ({ ...cur, expectedYieldUnit: e.target.value }))}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white"
                      >
                        {YIELD_UNITS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {resource === 'users' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={record.fullName || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, fullName: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      required
                      value={record.email || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, email: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Role *</label>
                    <select
                      required
                      value={record.role || 'Farm Manager'}
                      onChange={(e) => setRecord((cur) => ({ ...cur, role: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Farm Manager">Farm Manager</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={record.phoneNumber || ''}
                      onChange={(e) => setRecord((cur) => ({ ...cur, phoneNumber: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                    />
                  </div>
                </div>
              )}

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
            <Button onClick={openCreateModal}>
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
                <tr key={item.id || item.farmId || item.cropId} className="hover:bg-gray-50 transition-colors">
                  {columns.map(([key]) => (
                    <td key={key} className="border-b border-gray-100 px-5 py-3.5 max-w-[220px] truncate" title={String(item[key] || '')}>
                      {key === 'status' || key === 'health' ? (
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ['Healthy', 'Excellent', 'Active'].includes(item[key]) 
                            ? 'bg-green-50 text-green-700' 
                            : ['Needs Attention', 'Good', 'Average', 'Stable'].includes(item[key]) 
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
                          onClick={() => openEditModal(item)}
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

        <div className="sm:hidden divide-y divide-gray-100">
          {rows.map((item) => (
            <div key={item.id || item.farmId || item.cropId} className="p-4 space-y-2.5">
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
                      onClick={() => openEditModal(item)}
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
                            : ['Needs Attention', 'Good', 'Average', 'Stable'].includes(item[key])
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
