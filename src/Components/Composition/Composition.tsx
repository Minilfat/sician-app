/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import classnames from 'classnames';

import Level from 'src/Components/Level';
import { ReactComponent as Favorite } from 'src/assets/icons/favorite.svg';
import { ReactComponent as FavoriteBorder } from 'src/assets/icons/favorite_border.svg';

import classes from './Composition.module.scss';

type CompositionTypeProps = {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: number;
  isFavorite: boolean;
  isEven: boolean;
  favorite: (id: string) => void;
};

const Composition: FC<CompositionTypeProps> = ({
  id,
  title,
  artist,
  images,
  level,
  isFavorite,
  isEven,
  favorite
}: CompositionTypeProps) => {
  const mainStyles = classnames(classes.wrapper, classes[isEven ? 'bg-light' : 'bg']);

  return (
    <div className={mainStyles}>
      <div className={classes.icon}>
        <img src={images} alt="alb_cv" />
      </div>
      <div className={classes.info}>
        <div className={classes.title}>{title}</div>
        <div className={classes.artist}>{artist}</div>
      </div>
      <div className={classes.controls}>
        <div className={classes.level}>
          <Level level={level} isChecked={false} />
        </div>

        <div className={classes.favorite} onClick={(): void => favorite(id)}>
          <div className={classes[isFavorite ? 'favorite-fill' : 'favorite-border']}>
            <span>{isFavorite ? <Favorite /> : <FavoriteBorder />}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Composition;
