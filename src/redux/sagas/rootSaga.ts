import { takeLatest, delay, call, put, ForkEffect, getContext } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { fetchCompositions, fetchCompositionsSuccess, fetchCompositionsFailure } from '../slices/appSlice';

function* fetchCompositionsSaga(): SagaIterator {
  const api = yield getContext('api');
  const response = yield call(api.getCompoisitions, { _limit: '10' });
  yield response ? put(fetchCompositionsSuccess(response)) : put(fetchCompositionsFailure());
}

function* rootSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchCompositions.type, fetchCompositionsSaga);
  // yield takeLatest(fetchCompositions.type, fetchCompositionsSaga);
}

export default rootSaga;
