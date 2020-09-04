import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import appReducer from 'src/redux/slices/appSlice';
import rootSaga from 'src/redux/sagas/rootSaga';

const rootReducer = {
  app: appReducer
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
