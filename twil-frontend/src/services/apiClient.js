import axios from 'axios';
import { apiUrl } from '../constants';

const apiClient = axios.create({
  baseURL: apiUrl,
});

export default apiClient;
