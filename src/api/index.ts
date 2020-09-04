import { AxiosInstance } from 'axios';
import { ApiProviderType, ApiParams, CompositionType } from 'src/types/types';

const getCompoisitions = (axios: AxiosInstance) => (params: ApiParams = {}): Promise<CompositionType[]> =>
  axios
    .get('/songs', { params })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => ({ error: err.code }));

export default (axios: AxiosInstance): ApiProviderType => ({
  getCompoisitions: getCompoisitions(axios)
});
