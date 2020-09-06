import { RootState } from 'src/redux/store';
import { CompositionType, FavoriteSongsMap, ApiParams } from 'src/types/types';

export const compositionsSelector = (state: RootState): CompositionType[] => state.app.compositions || [];
export const favoritesSelector = (state: RootState): FavoriteSongsMap => state.app.favorites || {};
export const isLoadingSelector = (state: RootState): boolean => state.app.isLoading;
export const isErrorSelector = (state: RootState): boolean => Boolean(state.app.error);
export const hasMorePagesSelector = (state: RootState): boolean => state.app.hasMorePages;
export const fetchParamsSelector = (state: RootState): ApiParams => state.app.params;
