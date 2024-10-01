import axios from 'axios';
import baseUrl from '../constants';

export const getPeople = async () => {
  const { data } = await axios.get(`${baseUrl}/people`);
  return data;
};

export const findPerson = async (name) => {
  const { data } = await axios.get(`${baseUrl}/people/search/${name}`);
  return data;
};

export const addPerson = async (name, api_specific_id) => {
  const { data } = await axios
    .post(`${baseUrl}/people/`, {
      name,
      api_specific_id,
    })
    .catch((error) => console.log(error));
  return data;
};

export const unfollowPerson = async (id) => {
  await axios
    .delete(`${baseUrl}/people/${id}`)
    .catch((error) => console.log(error));
};
