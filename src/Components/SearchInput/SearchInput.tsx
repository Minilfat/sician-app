import React, { FC } from 'react';

import { ReactComponent as SearchImage } from 'src/assets/icons/search.svg';

import classes from './SearchInput.module.scss';

const SearchInput: FC = () => {
  return (
    <div className={classes.wrapper}>
      <input className={classes['input-field']} type="text" placeholder="Search for songs by artist or title" />
      <div className={classes.icon}>
        <SearchImage />
      </div>
    </div>
  );
};

export default SearchInput;
