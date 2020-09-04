/* eslint-disable @typescript-eslint/no-unused-vars */ // Need for action creators
import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from 'src/types/types';

const initialState: ApplicationState = {
  isLoading: false,
  error: '',
  compositions: []
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
    })
  }
});

export const { fetchCompositions, fetchCompositionsSuccess, fetchCompositionsFailure } = app.actions;

export default app.reducer;
