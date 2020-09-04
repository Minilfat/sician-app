import React, { FC, useState } from 'react';
import MainPage from 'src/Pages/MainPage';

const App: FC = () => {
  const [gavna, setGavna] = useState<boolean>(false);

  return (
    <div>
      {gavna ? 'gavna' : 'ne gavna'}
      <button type="button" onClick={(): void => setGavna(!gavna)}>
        change
      </button>
      <MainPage />
    </div>
  );
};

export default App;
