/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from 'src/types/types';
import { PAGE_SIZE } from 'src/common/constants';

const initialState: ApplicationState = {
  isLoading: false,
  error: '',
  compositions: [],
  favorites: {},
  hasMorePages: true,
  params: {
    _start: '0',
    _limit: String(PAGE_SIZE)
  }
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchCompositions: (state): ApplicationState => ({
      ...state,
      isLoading: true
    }),
    fetchCompositionsSuccess: (state, action): ApplicationState => ({
      ...state,
      isLoading: false,
      compositions: action.payload,
      hasMorePages: action.payload.length === PAGE_SIZE,
      params: { ...state.params, _start: PAGE_SIZE.toString() }
    }),
    fetchCompositionsFailure: (state): ApplicationState => ({
      ...state,
      isLoading: false,
      error: 'ERROR_CODE'
    }),
    fetchFavorites: (state): ApplicationState => ({
      ...state
    }),
    fetchFavoritesSuccess: (state, action): ApplicationState => ({
      ...state,
      favorites: action.payload
    }),
    fetchFavoritesFailure: (state): ApplicationState => ({
      ...state,
      error: 'ERROR_CODE'
    }),
    getNextPage: (state): ApplicationState => ({
      ...state,
      isLoading: true
    }),
    getNextPageSuccess: (state, action): ApplicationState => ({
      ...state,
      isLoading: false,
      compositions: [...state.compositions, ...action.payload],
      hasMorePages: action.payload.length === PAGE_SIZE,
      params: { ...state.params, _start: (Number(state.params._start) + PAGE_SIZE).toString() }
    }),
    getNextPageFailure: (state): ApplicationState => ({
      ...state,
      isLoading: false,
      error: 'ERROR_CODE'
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateFavorite: (state, action): ApplicationState => ({ ...state }),
    updateFavoriteSuccess: (state, action): ApplicationState => {
      const { songId, favId } = action.payload;
      const favorites = JSON.parse(JSON.stringify(state.favorites));

      // means that some item was added
      if (songId && favId) favorites[songId] = favId;
      else delete favorites[songId];

      return {
        ...state,
        favorites
      };
    },
    updateFavoriteFailure: (state): ApplicationState => ({
      ...state,
      error: 'ERROR_CODE'
    }),
    resetError: (state): ApplicationState => ({
      ...state,
      error: ''
    }),
    setParams: (state, action): ApplicationState => ({
      ...state,
      compositions: [],
      params: action.payload,
      hasMorePages: true
    })
  }
});

export const {
  fetchCompositions,
  fetchCompositionsSuccess,
  fetchCompositionsFailure,
  fetchFavorites,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  getNextPage,
  getNextPageSuccess,
  getNextPageFailure,
  updateFavorite,
  updateFavoriteSuccess,
  updateFavoriteFailure,
  resetError,
  setParams
} = app.actions;

export default app.reducer;
