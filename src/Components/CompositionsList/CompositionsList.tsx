import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Composition from 'src/Components/Composition';
import { fetchCompositions } from 'src/redux/slices/appSlice';
import { compositionsSelector, isLoadingSelector } from 'src/redux/selectors';

import Spinner from 'src/Components/Spinner';

import classes from './CompositionsList.module.scss';

const CompositionsList: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(compositionsSelector);
  const isListLoading = useSelector(isLoadingSelector);

  const handleClick = (): void => {
    dispatch(fetchCompositions());
  };

  const test = (e: string): void => {
    console.log(e);
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
            isFavorite={false}
            isEven={i % 2 === 0}
            favorite={test}
          />
        ))}
        {isListLoading && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          FETCH
        </button>
      </div>
    </>
  );
};

export default CompositionsList;
