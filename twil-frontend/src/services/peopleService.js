import axios from './apiClient';

export const getPeople = async () => {
  const { data } = await axios.get(`/people`);
  return data;
};

export const findPerson = async (name) => {
  const { data } = await axios.get(`/people/search/${name}`);
  return data;
};

export const addPerson = async (name, api_specific_id) => {
  const { data } = await axios
    .post(`/people/`, {
      name,
      api_specific_id,
    })
    .catch((error) => console.log(error));
  return data;
};

export const unfollowPerson = async (id) => {
  await axios.delete(`/people/${id}`).catch((error) => console.log(error));
};

export default {
  getPeople,
  findPerson,
  addPerson,
  unfollowPerson,
};
