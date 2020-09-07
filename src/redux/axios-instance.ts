import axios, { AxiosInstance } from 'axios';
import Qs from 'qs';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat' })
});

export default axiosInstance;
