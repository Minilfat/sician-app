/* eslint-disable @typescript-eslint/no-unused-vars */ // Need for action creators
import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from 'src/redux/types';

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
    fetchCompositionsSuccess: (state): ApplicationState => ({
      ...state,
      isLoading: false
    }),
    fetchCompositionsFailure: (state, action): ApplicationState => ({
      ...state,
      isLoading: false,
      error: action.payload
    })
  }
});

export const { fetchCompositions, fetchCompositionsSuccess, fetchCompositionsFailure } = app.actions;

export default app.reducer;
