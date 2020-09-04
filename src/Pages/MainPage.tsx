import React, { FC, useState } from 'react';

import SearchBar from 'src/Components/SearchBar';
import Composition from 'src/Components/Composition';

const MainPage: FC = () => {
  const [lev, setLev] = useState<number>(1);
  const [isFav, setIsFav] = useState<boolean>(false);

  const changeLevel = (): void => {
    setLev((lev + 1) % 16);
  };

  const handleAddToFavorites = (id: string): void => {
    console.log(id);
    setIsFav(!isFav);
  };

  return (
    <div>
      <SearchBar />
      <Composition
        id="gavna"
        title="Red River Valley"
        artist="Traditional"
        images="https://d3mzlbmn9ukddk.cloudfront.net/songs/image/7c20bd2f-8c7b-4e28-baec-85dd6ea7fe15.jpg"
        level={lev}
        isEven
        isFavorite={isFav}
        favorite={handleAddToFavorites}
      />
      <button type="button" onClick={(): void => changeLevel()}>
        click
      </button>
    </div>
  );
};

export default MainPage;
