import React, { FC } from 'react';

import Level from 'src/Components/Level';
import { ReactComponent as Favorite } from 'src/assets/icons/favorite.svg';
import { ReactComponent as FavoriteBorder } from 'src/assets/icons/favorite_border.svg';

import classes from './Composition.module.scss';

type CompositionTypeProps = {
  title: string;
  artist: string;
  images: string;
  level: number;
  isFavorite: boolean;
  isEven: boolean;
};

const Composition: FC<CompositionTypeProps> = ({
  title,
  artist,
  images,
  level,
  isFavorite,
  isEven
}: CompositionTypeProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        <img src={images} alt="album_cover" />
      </div>
      <div className={classes.info}>
        <div className={classes.title}>{title}</div>
        <div className={classes.artist}>{artist}</div>
      </div>
      <div className={classes.controls}>
        <div>
          <Level level={level} />
        </div>
        <div>{isFavorite ? <Favorite /> : <FavoriteBorder />}</div>
      </div>
    </div>
  );
};

export default Composition;
