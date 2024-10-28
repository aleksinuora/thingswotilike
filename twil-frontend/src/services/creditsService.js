import axios from './apiClient';

export const getCredits = async () => {
  const { data } = await axios.get(`/credits`);
  return data;
};

export const getCreditsById = async (id) => {
  const { data } = await axios.get(`$/credits/${id}`);
  return data;
};

export default {
  getCredits,
  getCreditsById,
};
