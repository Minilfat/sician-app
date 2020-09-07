import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Composition from 'src/Components/Composition';
import { fetchCompositions, getNextPage, updateFavorite } from 'src/redux/slices/appSlice';
import { compositionsSelector, isLoadingSelector, favoritesSelector, hasMorePagesSelector } from 'src/redux/selectors';

import Spinner from 'src/Components/Spinner';

import classes from './CompositionsList.module.scss';

const CompositionsList: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(compositionsSelector);
  const favorites = useSelector(favoritesSelector);
  const isListLoading = useSelector(isLoadingSelector);
  const hasMore = useSelector(hasMorePagesSelector);

  useEffect(() => {
    dispatch(fetchCompositions());
  }, []);

  window.onscroll = (): void => {
    if (isListLoading || !hasMore) return;
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      dispatch(getNextPage());
    }
  };

  const toggleFavorite = (id: string): void => {
    dispatch(updateFavorite({ songId: id, favId: favorites[id] }));
  };

  return (
    <>
      <div className={classes.wrapper}>
        {data.length > 0 &&
          data.map((d, i) => (
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
        {!isListLoading && data.length === 0 && <div>No songs</div>}
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
