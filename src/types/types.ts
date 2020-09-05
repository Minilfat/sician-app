export type ApplicationState = {
  isLoading: boolean;
  error: string | null;
  compositions: CompositionType[];
  favorites: FavoriteSongsMap;
  nextPageStartIndex: number;
};

export type CompositionType = {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: number;
  search: string;
};

export type FavoriteSongType = {
  id: string;
  songId: string;
};

export type FavoriteSongsMap = {
  [key: string]: boolean;
};

export type ApiProviderType = {
  getCompoisitions: (params: ApiParams) => Promise<CompositionType[]>;
  getFavorites: () => Promise<FavoriteSongType[]>;
};

export type ApiParams = {
  _start?: string;
  _end?: string;
  _limit?: string;
  search_like?: string;
  level?: string;
};
