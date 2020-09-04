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
