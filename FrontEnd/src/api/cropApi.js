import axiosInstance from './axiosInstance';
import { getCrops as mockGetCrops, createRecord, updateRecord, deleteRecord } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

export const getCrops = async () => {
  if (!hasBackend) {
    return mockGetCrops();
  }
  const response = await axiosInstance.get('/crops');
  return response.data;
};

export const getCropById = async (id) => {
  if (!hasBackend) {
    const list = await mockGetCrops();
    return list.find((c) => String(c.id) === String(id));
  }
  const response = await axiosInstance.get(`/crops/${id}`);
  return response.data;
};

export const createCrop = async (payload) => {
  if (!hasBackend) {
    return createRecord('crops', payload);
  }
  const response = await axiosInstance.post('/crops', payload);
  return response.data;
};

export const updateCrop = async (id, payload) => {
  if (!hasBackend) {
    return updateRecord('crops', id, payload);
  }
  const response = await axiosInstance.put(`/crops/${id}`, payload);
  return response.data;
};

export const deleteCrop = async (id) => {
  if (!hasBackend) {
    return deleteRecord('crops', id);
  }
  const response = await axiosInstance.delete(`/crops/${id}`);
  return response.data;
};
