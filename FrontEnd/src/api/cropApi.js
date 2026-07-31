import axiosInstance from './axiosInstance';
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