import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, XCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { normalizeRole } from '../../config/roleRoutes';
import { createCrop, deleteCrop, getCrops, updateCrop } from '../../services/mockApi';

const cropSchema = z.object({
  name: z.string().min(2, 'Crop name is required'),
  stage: z.string().min(2, 'Growth stage is required'),
  health: z.string().min(2, 'Health status is required'),
  plantingDate: z.string().nonempty('Planting date is required'),
  harvestDate: z.string().nonempty('Harvest date is required'),
  expectedYield: z.string().min(1, 'Expected yield is required'),
  marketPrice: z.string().min(1, 'Market price is required'),
  diseaseStatus: z.string().min(2, 'Disease status is required'),
});

const defaultValues = {
  name: '',
  stage: 'Seedling',
  health: 'Good',
  plantingDate: '',
  harvestDate: '',
  expectedYield: '',
  marketPrice: '',
  diseaseStatus: 'No active disease',
};

export const CropManagement = () => {
  const { user } = useAuth();
  const currentRole = normalizeRole(user?.role);
  const isAdmin = currentRole === 'ADMIN';
  const isFarmer = currentRole === 'FARMER' || currentRole === 'FARM_MANAGER';
  const isGuest = currentRole === 'GUEST' || currentRole === 'USER' || (!isAdmin && !isFarmer);

  const canAddCrop = isAdmin || isFarmer;

  const isOwnCrop = useCallback(
    (crop) => {
      if (!crop || !user) return false;
      if (isAdmin) return true;
      if (isGuest) return false;

      const userIdStr = String(user.id || '').toLowerCase();
      const userNameStr = String(user.fullName || user.name || '').toLowerCase().trim();
      const userEmailStr = String(user.email || '').toLowerCase().trim();

      const checkFields = [
        crop.createdBy,
        crop.userId,
        crop.user_id,
        crop.farmerId,
        crop.farmer_id,
        crop.owner,
        crop.manager,
        crop.farmer,
        crop.farmerName,
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
      return false;
    },
    [isAdmin, isGuest, user]
  );

  const canEditCrop = (crop) => isAdmin || (isFarmer && isOwnCrop(crop));
  const canDeleteCrop = (crop) => isAdmin || (isFarmer && isOwnCrop(crop));

  const [crops, setCrops] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(cropSchema),
    defaultValues,
  });

  const loadCrops = useCallback(async () => {
    const data = await getCrops();
    setCrops(data);
  }, []);

  useEffect(() => {
    loadCrops();
  }, [loadCrops]);

  const summaries = useMemo(() => {
    const healthy = crops.filter((crop) => crop.health.toLowerCase().includes('excel')).length;
    const harvestReady = crops.filter((crop) => ['Maturity', 'Fruit development', 'Grain filling'].includes(crop.stage)).length;
    return { healthy, harvestReady };
  }, [crops]);

  const openAddModal = () => {
    if (!canAddCrop) return;
    reset(defaultValues);
    setSelectedCrop(null);
    setModalOpen(true);
  };

  const openEditModal = (crop) => {
    if (!canEditCrop(crop)) return;
    reset({
      name: crop.name,
      stage: crop.stage,
      health: crop.health,
      plantingDate: crop.plantingDate,
      harvestDate: crop.harvestDate,
      expectedYield: crop.expectedYield,
      marketPrice: crop.marketPrice,
      diseaseStatus: crop.diseaseStatus,
    });
    setSelectedCrop(crop);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCrop(null);
    reset(defaultValues);
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      if (selectedCrop) {
        await updateCrop(selectedCrop.id, values);
        addToast('Crop updated successfully', 'success');
      } else {
        const payload = {
          ...values,
          createdBy: user?.id || user?.email || user?.fullName,
          userId: user?.id,
          farmer: user?.fullName,
          owner: user?.fullName,
        };
        await createCrop(payload);
        addToast('Crop added successfully', 'success');
      }
      await loadCrops();
      closeModal();
    } catch (error) {
      addToast('Unable to save crop details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (crop) => {
    if (!canDeleteCrop(crop)) return;
    const confirmed = window.confirm('Remove this crop from the management list?');
    if (!confirmed) return;
    try {
      await deleteCrop(crop.id);
      await loadCrops();
      addToast('Crop removed successfully', 'success');
    } catch (error) {
      addToast('Unable to remove crop', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="space-y-4 border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(236,253,245,0.95))]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Crop management</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Track, update, and grow your crop portfolio.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Manage planting and harvest details for every active crop across your farms with fast edit, add, and removal controls.</p>
            </div>
            {canAddCrop && (
              <Button className="mt-2 sm:mt-0" onClick={openAddModal}>
                <Plus className="mr-2 h-4 w-4" /> Add new crop
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-100 bg-white/80 p-5">
              <p className="text-sm font-medium text-slate-500">Total varieties</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{crops.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-100 bg-white/80 p-5">
              <p className="text-sm font-medium text-slate-500">Healthy crops</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{summaries.healthy}</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-100 bg-white/80 p-5">
              <p className="text-sm font-medium text-slate-500">Harvest ready</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{summaries.harvestReady}</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4 border-amber-100/80 bg-[linear-gradient(135deg,_rgba(255,251,235,0.95),_rgba(255,255,255,0.95))]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Management timeline</p>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Live sync</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Spring planting window</p>
              <p className="mt-2">Plan next irrigation, nutrient delivery, and pest patrols for your priority crops.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Quality assurance</p>
              <p className="mt-2">Review health status and disease alerts before harvest to maximize yield quality.</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-x-auto border-slate-200 bg-white/90">
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Crop portfolio</p>
            <p className="text-sm text-slate-500">Editable crop records with planting and harvest timelines.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{crops.length} records</span>
        </div>

        <div className="min-w-[980px]">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500">
                <th className="border-b border-slate-200 px-5 py-4">Crop</th>
                <th className="border-b border-slate-200 px-5 py-4">Stage</th>
                <th className="border-b border-slate-200 px-5 py-4">Health</th>
                <th className="border-b border-slate-200 px-5 py-4">Planting</th>
                <th className="border-b border-slate-200 px-5 py-4">Harvest</th>
                <th className="border-b border-slate-200 px-5 py-4">Yield</th>
                <th className="border-b border-slate-200 px-5 py-4">Price</th>
                <th className="border-b border-slate-200 px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{crop.name}</div>
                    <div className="text-xs text-slate-500">{crop.diseaseStatus}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{crop.stage}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${crop.health.toLowerCase().includes('excel') ? 'bg-emerald-100 text-emerald-700' : crop.health.toLowerCase().includes('stable') ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {crop.health}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{crop.plantingDate}</td>
                  <td className="px-5 py-4 text-slate-500">{crop.harvestDate}</td>
                  <td className="px-5 py-4 text-slate-700">{crop.expectedYield}</td>
                  <td className="px-5 py-4 text-slate-700">{crop.marketPrice}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {canEditCrop(crop) && (
                        <button type="button" onClick={() => openEditModal(crop)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700">
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                      )}
                      {canDeleteCrop(crop) && (
                        <button type="button" onClick={() => handleDelete(crop)} className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100">
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                      {!canEditCrop(crop) && !canDeleteCrop(crop) && (
                        <span className="text-xs text-slate-400">View only</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!crops.length && (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-slate-500">No crop records available yet. Add a crop to begin managing your portfolio.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">{selectedCrop ? 'Update crop' : 'Add new crop'}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{selectedCrop ? `${selectedCrop.name} details` : 'Record a crop cycle'}</h3>
              </div>
              <button type="button" className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200" onClick={closeModal}>
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Crop name</span>
                <input type="text" {...register('name')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.name && <span className="text-xs text-rose-600">{errors.name.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Growth stage</span>
                <input type="text" {...register('stage')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.stage && <span className="text-xs text-rose-600">{errors.stage.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Health status</span>
                <input type="text" {...register('health')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.health && <span className="text-xs text-rose-600">{errors.health.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Planting date</span>
                <input type="date" {...register('plantingDate')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.plantingDate && <span className="text-xs text-rose-600">{errors.plantingDate.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Harvest date</span>
                <input type="date" {...register('harvestDate')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.harvestDate && <span className="text-xs text-rose-600">{errors.harvestDate.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Expected yield</span>
                <input type="text" {...register('expectedYield')} placeholder="e.g. 15 tons/acre" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.expectedYield && <span className="text-xs text-rose-600">{errors.expectedYield.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Market price</span>
                <input type="text" {...register('marketPrice')} placeholder="e.g. ₹42/kg" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.marketPrice && <span className="text-xs text-rose-600">{errors.marketPrice.message}</span>}
              </label>

              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Disease status</span>
                <input type="text" {...register('diseaseStatus')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                {errors.diseaseStatus && <span className="text-xs text-rose-600">{errors.diseaseStatus.message}</span>}
              </label>

              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end">
                <Button variant="secondary" type="button" className="w-full md:w-auto" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="w-full md:w-auto" disabled={saving}>
                  {saving ? 'Saving...' : selectedCrop ? 'Save changes' : 'Add crop'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
