import React, { FC, useState } from 'react';

import SearchBar from 'src/Components/SearchBar';
import CompositionsList from 'src/Components/CompositionsList/CompositionsList';

const MainPage: FC = () => {
  return (
    <div>
      <SearchBar />
      <CompositionsList />
    </div>
  );
};

export default MainPage;
