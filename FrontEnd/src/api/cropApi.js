import axiosInstance from './axiosInstance';
<<<<<<< HEAD
import { getFarms } from './farmApi';

const extractArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.crops)) return data.crops;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.records)) return data.records;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.results)) return data.results;
  if (typeof data === 'object' && data !== null) {
    if (data.id || data.cropId || data.cropName || data.name) {
      return [data];
    }
  }
  return [];
};

const mapCropFromBackend = (dto) => {
  if (!dto) return null;
  const farmerName = dto.farmerName || dto.farmOwner || dto.ownerUsername || 'Ramesh Kumar';
  return {
    ...dto,
    id: dto.cropId || dto.id,
    cropId: dto.cropId || dto.id,
    farmerName: farmerName,
    farmer: farmerName,
    name: dto.cropName || dto.name || 'Unnamed Crop',
    cropName: dto.cropName || dto.name || 'Unnamed Crop',
    season: dto.season || dto.stage || 'Kharif',
    stage: dto.stage || dto.season || 'Vegetative',
    farmId: dto.farmId,
    farm: farmerName || dto.farmName || dto.farm || '',
    farmName: dto.farmName || dto.farm || '',
    health: dto.health || 'Excellent',
    expectedYield: dto.expectedYield || '4.5 tons/acre',
    plantingDate: dto.plantingDate || new Date().toISOString().split('T')[0],
    status: dto.status || 'Active',
  };
};

const resolveFarmId = async (payload) => {
  if (payload.farmId && !isNaN(Number(payload.farmId))) {
    return Number(payload.farmId);
  }
  if (payload.farm && !isNaN(Number(payload.farm))) {
    return Number(payload.farm);
  }
  try {
    const farms = await getFarms();
    if (Array.isArray(farms) && farms.length > 0) {
      if (payload.farm) {
        const farmStr = String(payload.farm).toLowerCase().trim();
        const matched = farms.find(
          (f) => String(f.name || f.farmName || '').toLowerCase().trim() === farmStr || String(f.id || f.farmId) === farmStr
        );
        if (matched) return Number(matched.id || matched.farmId);
      }
      return Number(farms[0].id || farms[0].farmId || 1);
    }
  } catch {}
  return 1;
};

const mapCropToBackend = async (payload = {}) => {
  const farmId = await resolveFarmId(payload);
  return {
    cropName: payload.name || payload.cropName || 'New Crop',
    season: payload.season || payload.stage || 'Kharif',
    stage: payload.stage || 'Vegetative',
    health: payload.health || 'Excellent',
    expectedYield: payload.expectedYield || '',
    farmId,
  };
};

export const getCrops = async () => {
  const response = await axiosInstance.get('/crops');
  const list = extractArray(response.data);
  return list.map(mapCropFromBackend).filter(Boolean);
};

export const getCropById = async (id) => {
  const response = await axiosInstance.get(`/crops/${id}`);
  return mapCropFromBackend(response.data);
};

export const createCrop = async (payload) => {
  const backendPayload = await mapCropToBackend(payload);
  const response = await axiosInstance.post('/crops', backendPayload);
  return mapCropFromBackend(response.data);
};

export const updateCrop = async (id, payload) => {
  const backendPayload = await mapCropToBackend(payload);
  const response = await axiosInstance.put(`/crops/${id}`, backendPayload);
  return mapCropFromBackend(response.data);
};

export const deleteCrop = async (id) => {
  const response = await axiosInstance.delete(`/crops/${id}`);
  return response.data;
};
=======
import { getCrops as mockGetCrops, createRecord, updateRecord, deleteRecord } from '../services/mockApi';
import { getFarms } from './farmApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

const normalizeCrop = (crop) => ({
  ...crop,
  id: crop.cropId ?? crop.id,
  name: crop.cropName ?? crop.name,
  farm: crop.farmName ?? crop.farm,
});

const resolveFarmId = async (farmNameOrId) => {
  if (!farmNameOrId) return null;
  if (!Number.isNaN(Number(farmNameOrId))) return Number(farmNameOrId);
  const farms = await getFarms();
  const match = farms.find((f) => f.name === farmNameOrId || f.farmName === farmNameOrId);
  return match ? match.id : null;
};

export const getCrops = async () => {
  if (!hasBackend) {
    return mockGetCrops();
  }
  const response = await axiosInstance.get('/crops');
  return (response.data || []).map(normalizeCrop);
};

export const getCropById = async (id) => {
  if (!hasBackend) {
    const list = await mockGetCrops();
    return list.find((c) => String(c.id) === String(id));
  }
  const response = await axiosInstance.get(`/crops/${id}`);
  return normalizeCrop(response.data);
};

export const createCrop = async (payload) => {
  if (!hasBackend) {
    return createRecord('crops', payload);
  }
  const farmId = await resolveFarmId(payload.farm ?? payload.farmId);
  if (!farmId) {
    throw new Error('Please select a valid farm for this crop.');
  }
  const apiPayload = {
    cropName: payload.name ?? payload.cropName,
    season: payload.season || payload.stage || 'Kharif',
    farmId,
    stage: payload.stage,
    health: payload.health,
    plantingDate: payload.plantingDate,
    expectedYield: payload.expectedYield,
  };
  const response = await axiosInstance.post('/crops', apiPayload);
  return normalizeCrop(response.data);
};

export const updateCrop = async (id, payload) => {
  if (!hasBackend) {
    return updateRecord('crops', id, payload);
  }
  const farmId = await resolveFarmId(payload.farm ?? payload.farmId);
  const apiPayload = {
    cropName: payload.name ?? payload.cropName,
    season: payload.season || payload.stage || 'Kharif',
    farmId,
    stage: payload.stage,
    health: payload.health,
    plantingDate: payload.plantingDate,
    expectedYield: payload.expectedYield,
  };
  const response = await axiosInstance.put(`/crops/${id}`, apiPayload);
  return normalizeCrop(response.data);
};

export const deleteCrop = async (id) => {
  if (!hasBackend) {
    return deleteRecord('crops', id);
  }
  const response = await axiosInstance.delete(`/crops/${id}`);
  return response.data;
};
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
