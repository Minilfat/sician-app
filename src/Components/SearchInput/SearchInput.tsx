import React, { FC, ChangeEvent, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { DEBOUNCE_DELAY } from 'src/common/constants';
import { ReactComponent as SearchImage } from 'src/assets/icons/search.svg';

import classes from './SearchInput.module.scss';

type SearchInputProps = {
  onSearch: (value: string) => void;
};

const SearchInput: FC<SearchInputProps> = ({ onSearch }: SearchInputProps) => {
  const debounceStartSearch = useCallback(
    debounce((value: string): void => {
      onSearch(value);
    }, DEBOUNCE_DELAY),
    []
  );

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    debounceStartSearch(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <input
        className={classes['input-field']}
        type="text"
        placeholder="Search for songs by artist or title"
        onChange={handleInputChanged}
      />
      <div className={classes.icon}>
        <SearchImage />
      </div>
    </div>
  );
};

export default SearchInput;
