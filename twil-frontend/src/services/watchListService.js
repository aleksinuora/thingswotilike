import axios from './apiClient';

export const addWatchListEntry = async (person_name, credit_details) => {
  const { data } = await axios
    .post(`/watch_list`, {
      person_name,
      credit_details,
    })
    .catch((error) => console.log(error));
  return data;
};

export const getWatchList = async () => {
  const { data } = await axios.get(`/watch_list`);
  return data;
};

export default {
  addWatchListEntry,
  getWatchList,
};
