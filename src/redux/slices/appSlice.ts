import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from 'src/types/types';
import { PAGE_SIZE } from 'src/common/constants';

const initialState: ApplicationState = {
  isLoading: false,
  error: '',
  compositions: [],
  favorites: {},
  nextPageStartIndex: PAGE_SIZE
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
      compositions: action.payload
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
      isLoading: true,
      error: 'ERROR_CODE'
    }),
    getNextPageSuccess: (state, action): ApplicationState => ({
      ...state,
      isLoading: false,
      compositions: [...state.compositions, ...action.payload],
      nextPageStartIndex: state.nextPageStartIndex + PAGE_SIZE
    }),
    getNextPageFailure: (state): ApplicationState => ({
      ...state,
      isLoading: false,
      error: 'ERROR_CODE'
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
  getNextPageFailure
} = app.actions;

export default app.reducer;
