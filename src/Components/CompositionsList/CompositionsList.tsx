import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import Composition from 'src/Components/Composition';
import { fetchCompositions, getNextPage, updateFavorite } from 'src/redux/slices/appSlice';
import { compositionsSelector, isLoadingSelector, favoritesSelector } from 'src/redux/selectors';

import Spinner from 'src/Components/Spinner';

import classes from './CompositionsList.module.scss';

const CompositionsList: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(compositionsSelector);
  const favorites = useSelector(favoritesSelector);
  const isListLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(fetchCompositions());
  }, []);

  window.onscroll = debounce(() => {
    if (isListLoading) return;
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      dispatch(getNextPage());
    }
  }, 300);

  const toggleFavorite = (id: string): void => {
    dispatch(updateFavorite({ songId: id, favId: favorites[id] }));
  };

  return (
    <>
      <div className={classes.wrapper}>
        {data.map((d, i) => (
          <Composition
            key={d.id}
            id={d.id}
            title={d.title}
            artist={d.artist}
            images={d.images}
            level={d.level}
            isFavorite={!!favorites[d.id]}
            isEven={i % 2 === 0}
            favorite={toggleFavorite}
          />
        ))}
        {isListLoading && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default CompositionsList;
