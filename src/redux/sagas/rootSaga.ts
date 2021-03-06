import { takeLatest, call, put, ForkEffect, getContext, select } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { AnyAction } from 'redux';

import {
  fetchCompositions,
  fetchCompositionsSuccess,
  fetchCompositionsFailure,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  getNextPage,
  getNextPageFailure,
  getNextPageSuccess,
  updateFavorite,
  updateFavoriteSuccess,
  updateFavoriteFailure
} from 'src/redux/slices/appSlice';
import { favoritesSelector, fetchParamsSelector } from 'src/redux/selectors';
import { FavoriteSongsMap, FavoriteSongType } from 'src/types';

function* fetchFavoritesSaga(): SagaIterator {
  const api = yield getContext('api');
  const response = yield call(api.getFavorites);

  if (!response.error) {
    const transformedData = response.reduce((acc: FavoriteSongsMap, fav: FavoriteSongType) => {
      acc[fav.songId] = fav.id;
      return acc;
    }, {});

    yield put(fetchFavoritesSuccess(transformedData));
  } else yield put(fetchFavoritesFailure());
}

function* fetchCompositionsSaga(): SagaIterator {
  const favorites = yield select(favoritesSelector);
  if (Object.keys(favorites).length === 0) yield call(fetchFavoritesSaga);

  const api = yield getContext('api');
  const params = yield select(fetchParamsSelector);
  const response = yield call(api.getCompoisitions, params);
  yield !response.error ? put(fetchCompositionsSuccess(response)) : put(fetchCompositionsFailure());
}

function* getNextPageSaga(): SagaIterator {
  const api = yield getContext('api');
  const params = yield select(fetchParamsSelector);
  const response = yield call(api.getCompoisitions, params);

  yield !response.error ? put(getNextPageSuccess(response)) : put(getNextPageFailure());
}

function* updateFavoriteSaga(action: AnyAction): SagaIterator {
  const favorites = yield select(favoritesSelector);
  const shouldBeRemoved = Boolean(favorites[action.payload.songId]);
  const api = yield getContext('api');
  const response = yield call(
    api[shouldBeRemoved ? 'deleteFavorite' : 'addFavorite'],
    shouldBeRemoved ? action.payload.favId : action.payload.songId
  );

  yield !response.error
    ? put(
        updateFavoriteSuccess({
          songId: shouldBeRemoved ? action.payload.songId : response.songId,
          favId: response.id
        })
      )
    : put(updateFavoriteFailure());
}

function* rootSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchCompositions.type, fetchCompositionsSaga);
  yield takeLatest(getNextPage.type, getNextPageSaga);
  yield takeLatest(updateFavorite.type, updateFavoriteSaga);
}

export default rootSaga;
