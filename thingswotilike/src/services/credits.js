import axios from 'axios';
import baseUrl from '../constants';

export const getCredits = async () => {
  const { data } = await axios.get(`${baseUrl}/credits`);
  return data;
};
