import React, { FC, useState } from 'react';

import SearchBar from 'src/Components/SearchBar';
import Composition from 'src/Components/Composition';

const MainPage: FC = () => {
  const [lev, setLev] = useState<number>(1);
  const changeLevel = (): void => {
    setLev((lev + 1) % 6);
  };
  return (
    <div>
      <SearchBar />
      <div>main page</div>
      <Composition
        title="Red River Valley"
        artist="Traditional"
        images="https://d3mzlbmn9ukddk.cloudfront.net/songs/image/7c20bd2f-8c7b-4e28-baec-85dd6ea7fe15.jpg"
        level={lev}
        isEven={false}
        isFavorite
      />
      <button type="button" onClick={(): void => changeLevel()}>
        click
      </button>
    </div>
  );
};

export default MainPage;
