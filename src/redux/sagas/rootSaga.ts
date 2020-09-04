import { takeLatest, delay, call, put, ForkEffect } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { fetchCompositions, fetchCompositionsSuccess } from '../slices/appSlice';

function* fetchCompositionsSaga(): SagaIterator {
  yield call(delay, 5000);
  yield put(fetchCompositionsSuccess());
}

function* rootSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchCompositions.type, fetchCompositionsSaga);
}

export default rootSaga;
