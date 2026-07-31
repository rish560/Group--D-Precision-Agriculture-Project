import { getSoilReports as mockGetSoilReports } from '../services/mockApi';

export const getSoilReports = async () => {
  return mockGetSoilReports();
};
