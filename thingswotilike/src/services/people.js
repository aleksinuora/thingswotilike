import axios from 'axios';
import { apiUrl } from '../constants';

export const getPeople = async () => {
  const { data } = await axios.get(`${apiUrl}/people`);
  return data;
};

export const findPerson = async (name) => {
  const { data } = await axios.get(`${apiUrl}/people/search/${name}`);
  return data;
};

export const addPerson = async (name, api_specific_id) => {
  const { data } = await axios
    .post(`${apiUrl}/people/`, {
      name,
      api_specific_id,
    })
    .catch((error) => console.log(error));
  return data;
};

export const unfollowPerson = async (id) => {
  await axios
    .delete(`${apiUrl}/people/${id}`)
    .catch((error) => console.log(error));
};
