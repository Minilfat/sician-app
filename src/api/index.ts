import { AxiosInstance } from 'axios';
import { ApiProviderType, ApiParams, CompositionType, FavoriteSongType } from 'src/types/types';

const getCompoisitions = (axios: AxiosInstance) => (params: ApiParams = {}): Promise<CompositionType[]> =>
  axios
    .get('/songs', {
      params: { ...params }
    })
    .then((response) => response.data)
    .catch((error) => ({ error }));

const getFavorites = (axios: AxiosInstance) => (): Promise<FavoriteSongType[]> =>
  axios
    .get('/favorites')
    .then((response) => response.data)
    .catch((error) => ({ error }));

const addFavorite = (axios: AxiosInstance) => (id: string): Promise<FavoriteSongType> =>
  axios
    .post('/favorites', { songId: id })
    .then((response) => response.data)
    .catch((error) => ({ error }));

const deleteFavorite = (axios: AxiosInstance) => (id: string): Promise<void> =>
  axios
    .delete(`/favorites/${id}`)
    .then((response) => response.data)
    .catch((error) => ({ error }));

export default (axios: AxiosInstance): ApiProviderType => ({
  getCompoisitions: getCompoisitions(axios),
  getFavorites: getFavorites(axios),
  addFavorite: addFavorite(axios),
  deleteFavorite: deleteFavorite(axios)
});
