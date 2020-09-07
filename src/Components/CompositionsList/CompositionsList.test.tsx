import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import axiosInstance from 'src/redux/axios-instance';

import CompositionsList from './CompositionsList';

const favoritesResponse = require('src/mock-data/favorites.json');
const songsResponse = require('src/mock-data/songs.json');

describe('CompositionsList component', () => {
  let mockApi: jest.SpyInstance;

  beforeEach(() => {
    mockApi = jest.spyOn(axiosInstance, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the list of songs with favorites', async () => {
    mockApi.mockImplementation((url) => {
      if (url.includes('favorites')) return Promise.resolve({ data: favoritesResponse });
      if (url.includes('songs')) return Promise.resolve({ data: songsResponse });

      return Promise.reject();
    });

    const { getByText } = render(
      <Provider store={store}>
        <CompositionsList />
      </Provider>
    );

    let song1, song2;

    await wait(() => {
      song1 = getByText(songsResponse[0].title);
      song2 = getByText(songsResponse[1].title);
      expect(song1).toBeInTheDocument();
      expect(song2).toBeInTheDocument();
    });

    const parent1 = song1.parentNode.parentNode;
    const songFavorite = parent1.querySelector('.favorite-fill');
    expect(songFavorite).not.toBeNull();

    const parent2 = song2.parentNode.parentNode;
    const songNotFavorite = parent2.querySelector('.favorite-border');
    expect(songNotFavorite).not.toBeNull();

    expect(mockApi).toHaveBeenCalledTimes(2);
  });
});
