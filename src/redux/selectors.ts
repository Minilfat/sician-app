import { RootState } from 'src/redux/store';
import { CompositionType } from 'src/types/types';

export const compositionsSelector = (state: RootState): CompositionType[] => state.app.compositions;
export const isLoadingSelector = (state: RootState): boolean => state.app.isLoading;
