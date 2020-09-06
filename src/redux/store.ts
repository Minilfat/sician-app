import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import Qs from 'qs';

import appReducer from 'src/redux/slices/appSlice';
import rootSaga from 'src/redux/sagas/rootSaga';
import apiProvider from 'src/api';

const rootReducer = {
  app: appReducer
};

const sagaMiddleware = createSagaMiddleware({
  context: {
    api: apiProvider(
      axios.create({
        baseURL: 'http://localhost:3004',
        paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat' })
      })
    )
  }
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
