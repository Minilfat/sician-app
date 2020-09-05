import { RootState } from 'src/redux/store';
import { CompositionType, FavoriteSongsMap } from 'src/types/types';

export const compositionsSelector = (state: RootState): CompositionType[] => state.app.compositions || [];
export const favoritesSelector = (state: RootState): FavoriteSongsMap => state.app.favorites || {};
export const isLoadingSelector = (state: RootState): boolean => state.app.isLoading;
export const nextPageStartIndexSelector = (state: RootState): number => state.app.nextPageStartIndex;
