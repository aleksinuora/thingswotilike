import axios from 'axios';
import { apiUrl } from '../constants';

export const getCredits = async () => {
  const { data } = await axios.get(`${apiUrl}/credits`);
  return data;
};

export const getCreditsById = async (id) => {
  const { data } = await axios.get(`${apiUrl}/credits/${id}`);
  return data;
};

export default {
  getCredits,
  getCreditsById,
};
