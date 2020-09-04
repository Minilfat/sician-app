import React, { FC } from 'react';

import SearchInput from 'src/Components/SearchInput';

import classes from './SearchBar.module.scss';

const SearchBar: FC = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>New songs delivered every week</h1>
      <h4 className={classes.subtitle}>
        Here are the most recent additions to the Yousician App. Start playing today!
      </h4>
      <SearchInput />
    </div>
  );
};

export default SearchBar;
