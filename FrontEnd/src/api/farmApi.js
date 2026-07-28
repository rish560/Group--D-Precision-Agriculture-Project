import axiosInstance from './axiosInstance';
import { getFarms as mockGetFarms, createRecord, updateRecord, deleteRecord } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

export const getFarms = async () => {
  if (!hasBackend) {
    return mockGetFarms();
  }
  const response = await axiosInstance.get('/farms');
  return response.data;
};

export const getFarmById = async (id) => {
  if (!hasBackend) {
    const list = await mockGetFarms();
    return list.find((f) => String(f.id) === String(id));
  }
  const response = await axiosInstance.get(`/farms/${id}`);
  return response.data;
};

export const createFarm = async (payload) => {
  if (!hasBackend) {
    return createRecord('farms', payload);
  }
  const response = await axiosInstance.post('/farms', payload);
  return response.data;
};

export const updateFarm = async (id, payload) => {
  if (!hasBackend) {
    return updateRecord('farms', id, payload);
  }
  const response = await axiosInstance.put(`/farms/${id}`, payload);
  return response.data;
};

export const deleteFarm = async (id) => {
  if (!hasBackend) {
    return deleteRecord('farms', id);
  }
  const response = await axiosInstance.delete(`/farms/${id}`);
  return response.data;
};
