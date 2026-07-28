import axiosInstance from './axiosInstance';
import { getUsers as mockGetUsers, createRecord, updateRecord, deleteRecord } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

export const getUsers = async () => {
  if (!hasBackend) {
    return mockGetUsers();
  }
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const getUserById = async (id) => {
  if (!hasBackend) {
    const list = await mockGetUsers();
    return list.find((u) => String(u.id) === String(id));
  }
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (payload) => {
  if (!hasBackend) {
    return createRecord('users', payload);
  }
  const response = await axiosInstance.post('/users', payload);
  return response.data;
};

export const updateUser = async (id, payload) => {
  if (!hasBackend) {
    return updateRecord('users', id, payload);
  }
  const response = await axiosInstance.put(`/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id) => {
  if (!hasBackend) {
    return deleteRecord('users', id);
  }
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
