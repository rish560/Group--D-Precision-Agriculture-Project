import { getWeather as mockGetWeather } from '../services/mockApi';

export const getWeather = async () => {
  return mockGetWeather();
};
