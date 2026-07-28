import axiosInstance from './axiosInstance';
import { mockLogin, mockRegister } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

export const login = async (payloadOrEmail, password) => {
  let emailValue, passwordValue;
  if (typeof payloadOrEmail === 'object' && payloadOrEmail !== null) {
    emailValue = payloadOrEmail.email;
    passwordValue = payloadOrEmail.password;
  } else {
    emailValue = payloadOrEmail;
    passwordValue = password;
  }

  if (!hasBackend) {
    return mockLogin(emailValue, passwordValue);
  }

  const response = await axiosInstance.post('/auth/login', { email: emailValue, password: passwordValue });
  return response.data;
};

export const register = async (payload) => {
  if (!hasBackend) {
    // Map role values for mock storage compatibility
    const mockPayload = {
      ...payload,
      role: payload.role === 'Guest User' ? 'Guest' : payload.role
    };
    return mockRegister(mockPayload);
  }

  const apiPayload = {
    username: payload.fullName,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    password: payload.password,
  };

  const response = await axiosInstance.post('/auth/register', apiPayload);
  return response.data;
};
