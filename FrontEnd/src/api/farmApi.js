import axiosInstance from './axiosInstance';
<<<<<<< HEAD

const extractArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.farms)) return data.farms;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.records)) return data.records;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.results)) return data.results;
  if (typeof data === 'object' && data !== null) {
    if (data.id || data.farmId || data.farmName || data.name) {
      return [data];
    }
  }
  return [];
};

const mapFarmFromBackend = (dto) => {
  if (!dto) return null;
  const unit = dto.areaUnit || 'Acres';
  const numericArea = dto.area != null ? parseFloat(dto.area) : 0;
  const displayArea = dto.area != null ? `${numericArea} ${unit}` : '0 Acres';
  const farmerName = dto.farmerName || dto.ownerUsername || dto.owner || 'Ramesh Kumar';
  return {
    ...dto,
    id: dto.farmId || dto.id,
    farmId: dto.farmId || dto.id,
    farmerName: farmerName,
    farmer: farmerName,
    name: dto.farmName || dto.name || 'Unnamed Farm',
    farmName: dto.farmName || dto.name || 'Unnamed Farm',
    location: dto.location || '',
    numericArea: numericArea,
    areaValue: numericArea,
    areaUnit: unit,
    area: displayArea,
    waterSource: dto.waterSource || 'Borewell',
    status: dto.status || 'Healthy',
    ownerId: dto.ownerId,
    owner: dto.ownerUsername || dto.owner || farmerName,
    manager: dto.ownerUsername || dto.manager || farmerName,
  };
};

const mapFarmToBackend = (payload = {}) => {
  const rawArea = payload.numericArea != null 
    ? payload.numericArea 
    : (payload.areaValue != null 
        ? payload.areaValue 
        : (payload.area != null ? String(payload.area).replace(/[^0-9.]/g, '') : ''));
  const parsedArea = parseFloat(rawArea);
  const validArea = !isNaN(parsedArea) && parsedArea > 0 ? parsedArea : 1.0;

  let ownerId = Number(payload.ownerId || payload.userId);
  if (isNaN(ownerId) || ownerId <= 0) {
    try {
      const stored = localStorage.getItem('farmverse-auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user?.id) {
          ownerId = Number(parsed.user.id);
        }
      }
    } catch {}
  }
  if (isNaN(ownerId) || ownerId <= 0) {
    ownerId = 1;
  }

  return {
    farmName: payload.name || payload.farmName || 'New Farm',
    farmerName: payload.farmerName || payload.farmer || '',
    location: payload.location || 'Default Location',
    area: validArea,
    areaUnit: payload.areaUnit || 'Acres',
    waterSource: payload.waterSource || 'Borewell',
    status: payload.status || 'Healthy',
    ownerId,
  };
};

export const getFarms = async () => {
  const response = await axiosInstance.get('/farms');
  const list = extractArray(response.data);
  return list.map(mapFarmFromBackend).filter(Boolean);
};

export const getFarmById = async (id) => {
  const response = await axiosInstance.get(`/farms/${id}`);
  return mapFarmFromBackend(response.data);
};

export const createFarm = async (payload) => {
  const backendPayload = mapFarmToBackend(payload);
  const response = await axiosInstance.post('/farms', backendPayload);
  return mapFarmFromBackend(response.data);
};

export const updateFarm = async (id, payload) => {
  const backendPayload = mapFarmToBackend(payload);
  const response = await axiosInstance.put(`/farms/${id}`, backendPayload);
  return mapFarmFromBackend(response.data);
};

export const deleteFarm = async (id) => {
  const response = await axiosInstance.delete(`/farms/${id}`);
  return response.data;
};
=======
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
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
