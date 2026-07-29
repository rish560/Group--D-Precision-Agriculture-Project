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

  try {
    const response = await axiosInstance.post('/auth/login', { email: emailValue, password: passwordValue });
    return {
      success: true,
      token: response.data.token,
      user: { email: emailValue, role: response.data.role },
      role: response.data.role,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

export const register = async (payload) => {
  if (!hasBackend) {
    const mockPayload = {
      ...payload,
      role: payload.role === 'Guest User' ? 'Guest' : payload.role
    };
    return mockRegister(mockPayload);
  }

  const apiPayload = {
    username: payload.fullName,
    email: payload.email,
    role: payload.role,
    password: payload.password,
  };

  try {
    const response = await axiosInstance.post('/auth/register', apiPayload);
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
    };
  }
};