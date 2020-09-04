export type ApplicationState = {
  isLoading: boolean;
  error: string | null;
  compositions: CompositionType[];
};

export type CompositionType = {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: number;
  search: string;
};

export type ApiProviderType = {
  getCompoisitions: (params: ApiParams) => Promise<CompositionType[]>;
};

export type ApiParams = {
  _start?: string;
  _end?: string;
  _limit?: string;
  search_like?: string;
  level?: string;
};
