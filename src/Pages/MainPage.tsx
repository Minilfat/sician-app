import React, { FC, useEffect, ReactText } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { isErrorSelector } from 'src/redux/selectors';
import { resetError } from 'src/redux/slices/appSlice';
import SearchBar from 'src/Components/SearchBar';
import CompositionsList from 'src/Components/CompositionsList/CompositionsList';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const isError = useSelector(isErrorSelector);
  const notify = (): ReactText =>
    toast.error('Something happened while processing your rerquest!', {
      position: 'top-right',
      autoClose: 500000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        dispatch(resetError());
      }
    });

  useEffect(() => {
    if (isError) notify();
  }, [isError]);

  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <CompositionsList />
    </div>
  );
};

export default MainPage;
