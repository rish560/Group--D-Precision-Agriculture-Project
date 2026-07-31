import axiosInstance from './axiosInstance';
import { getFarms as mockGetFarms, createRecord, updateRecord, deleteRecord } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

const normalizeFarm = (farm) => ({
  ...farm,
  id: farm.farmId ?? farm.id,
  name: farm.farmName ?? farm.name,
});

// Backend "area" is a BigDecimal — strip units like "48 acres" down to 48
const toNumericArea = (value) => {
  const num = parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''));
  return Number.isNaN(num) ? null : num;
};

export const getFarms = async () => {
  if (!hasBackend) {
    return mockGetFarms();
  }
  const response = await axiosInstance.get('/farms');
  return (response.data || []).map(normalizeFarm);
};

export const getFarmById = async (id) => {
  if (!hasBackend) {
    const list = await mockGetFarms();
    return list.find((f) => String(f.id) === String(id));
  }
  const response = await axiosInstance.get(`/farms/${id}`);
  return normalizeFarm(response.data);
};

export const createFarm = async (payload) => {
  if (!hasBackend) {
    return createRecord('farms', payload);
  }
  const apiPayload = {
    farmName: payload.name ?? payload.farmName,
    location: payload.location,
    area: toNumericArea(payload.area),
    ownerId: payload.ownerId,
    currentCrop: payload.currentCrop,
    waterSource: payload.waterSource,
    status: payload.status,
  };
  const response = await axiosInstance.post('/farms', apiPayload);
  return normalizeFarm(response.data);
};

export const updateFarm = async (id, payload) => {
  if (!hasBackend) {
    return updateRecord('farms', id, payload);
  }
  const apiPayload = {
    farmName: payload.name ?? payload.farmName,
    location: payload.location,
    area: toNumericArea(payload.area),
    ownerId: payload.ownerId,
    currentCrop: payload.currentCrop,
    waterSource: payload.waterSource,
    status: payload.status,
  };
  const response = await axiosInstance.put(`/farms/${id}`, apiPayload);
  return normalizeFarm(response.data);
};

export const deleteFarm = async (id) => {
  if (!hasBackend) {
    return deleteRecord('farms', id);
  }
  const response = await axiosInstance.delete(`/farms/${id}`);
  return response.data;
};