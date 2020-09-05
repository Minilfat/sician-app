import { AxiosInstance } from 'axios';
import { ApiProviderType, ApiParams, CompositionType, FavoriteSongType } from 'src/types/types';

const getCompoisitions = (axios: AxiosInstance) => (params: ApiParams = {}): Promise<CompositionType[]> =>
  axios
    .get('/songs', { params })
    .then((response) => response.data)
    .catch((error) => ({ error }));

const getFavorites = (axios: AxiosInstance) => (): Promise<FavoriteSongType[]> =>
  axios
    .get('/favorites')
    .then((response) => response.data)
    .catch((error) => ({ error }));

export default (axios: AxiosInstance): ApiProviderType => ({
  getCompoisitions: getCompoisitions(axios),
  getFavorites: getFavorites(axios)
});
