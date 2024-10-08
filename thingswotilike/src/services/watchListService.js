import axios from 'axios';
import { apiUrl } from '../constants';

export const addWatchListEntry = async (person_name, credit_details) => {
  const { data } = await axios
    .post(`${apiUrl}/watch_list`, {
      person_name,
      credit_details,
    })
    .catch((error) => console.log(error));
  return data;
};

export const getWatchList = async () => {
  const { data } = await axios.get(`${apiUrl}/watch_list`);
  return data;
};

export default {
  addWatchListEntry,
  getWatchList,
};
