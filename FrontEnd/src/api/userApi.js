import axiosInstance from './axiosInstance';
<<<<<<< HEAD
import { normalizeRole } from '../config/roleRoutes';

const extractArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.users)) return data.users;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.records)) return data.records;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.results)) return data.results;
  if (typeof data === 'object' && data !== null) {
    if (data.id || data.userId || data.username || data.email || data.fullName) {
      return [data];
    }
  }
  return [];
};

const mapUserFromBackend = (dto) => {
  if (!dto || typeof dto !== 'object') return null;
  const fullName = dto.fullName || dto.name || dto.username || 'User';
  const username = dto.username || dto.fullName || 'User';
  const email = dto.email || '';
  const phoneNumber = dto.phoneNumber || dto.phone || dto.mobile || '';
  const role = normalizeRole(dto.role || 'GUEST');

  return {
    ...dto,
    id: dto.id || dto.userId,
    fullName,
    username,
    email,
    phoneNumber,
    phone: phoneNumber,
    role,
  };
};

const mapUserToBackend = (payload = {}) => ({
  fullName: payload.fullName || payload.username || 'User',
  username: payload.username || payload.fullName || 'User',
  email: payload.email || '',
  password: payload.password || 'Password123!',
  role: normalizeRole(payload.role || 'GUEST'),
  phoneNumber: payload.phoneNumber || payload.phone || '',
});

export const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  const list = extractArray(response.data);
  return list.map(mapUserFromBackend).filter(Boolean);
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return mapUserFromBackend(response.data);
};

export const createUser = async (payload) => {
  const backendPayload = mapUserToBackend(payload);
  const response = await axiosInstance.post('/users', backendPayload);
  return mapUserFromBackend(response.data);
};

export const updateUser = async (id, payload) => {
  const backendPayload = mapUserToBackend(payload);
  const response = await axiosInstance.put(`/users/${id}`, backendPayload);
  return mapUserFromBackend(response.data);
};

export const deleteUser = async (id) => {
=======
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
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
