<<<<<<< HEAD
import axiosInstance from './axiosInstance';
import { normalizeRole } from '../config/roleRoutes';

export const login = async (payloadOrEmail, password) => {
  let emailValue, passwordValue;
=======
import axiosInstance, { setAuthToken } from './axiosInstance';
import { mockLogin, mockRegister } from '../services/mockApi';

const hasBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

export const login = async (payloadOrEmail, password) => {
  let emailValue, passwordValue;

>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  if (typeof payloadOrEmail === 'object' && payloadOrEmail !== null) {
    emailValue = payloadOrEmail.email;
    passwordValue = payloadOrEmail.password;
  } else {
    emailValue = payloadOrEmail;
    passwordValue = password;
  }

<<<<<<< HEAD
  try {
    const response = await axiosInstance.post('/auth/login', { email: emailValue, password: passwordValue });
    const { token, role, id, username } = response.data;
    const normRole = normalizeRole(role);
=======
  if (!hasBackend) {
    return mockLogin(emailValue, passwordValue);
  }

  try {
    const response = await axiosInstance.post('/auth/login', {
      email: emailValue,
      password: passwordValue,
    });

    console.log("Login Response:", response.data);

    const token = response.data.token;

    setAuthToken(token);

>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    return {
      success: true,
      token,
      user: {
<<<<<<< HEAD
        id: id || null,
        email: emailValue,
        username: username || emailValue,
        fullName: username || emailValue,
        role: normRole,
      },
      role: normRole,
    };
=======
        id: response.data.id,
        email: response.data.email,
        role: response.data.role,
      },
      role: response.data.role,
    };

>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

<<<<<<< HEAD
export const register = async (payload) => {
  const normRole = normalizeRole(payload.role || 'GUEST');
  const apiPayload = {
    fullName: payload.fullName || payload.name || '',
    username: payload.fullName || payload.username || payload.email || '',
    email: payload.email || '',
    password: payload.password || '',
    confirmPassword: payload.confirmPassword || payload.password || '',
    phoneNumber: payload.phone || payload.phoneNumber || '',
    role: normRole,
  };

  console.log('==================================================');
  console.log('[DEBUG] POST /api/auth/register Request Payload:', JSON.stringify(apiPayload, null, 2));
  console.log('==================================================');

  try {
    const response = await axiosInstance.post('/auth/register', apiPayload);
    console.log('[DEBUG] POST /api/auth/register Response Status:', response.status);
    console.log('[DEBUG] POST /api/auth/register Response Body:', response.data);
    return { success: true, ...response.data };
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data || {};
    console.error('[DEBUG] POST /api/auth/register FAILED. Status:', status);
    console.error('[DEBUG] Response Body:', data);
    console.error('[DEBUG] Full Error Object:', error);

    const errorMessage = data.message || data.error || error.message || 'Registration failed';
    return {
      success: false,
      status: status || 500,
      message: errorMessage,
      details: Array.isArray(data.details) ? data.details : [],
=======

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

    return {
      success: true,
      ...response.data,
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    };
  }
};