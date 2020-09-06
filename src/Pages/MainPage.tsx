import React, { FC, useEffect, ReactText } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { PAGE_SIZE } from 'src/common/constants';
import { isErrorSelector } from 'src/redux/selectors';
import { resetError, setParams, fetchCompositions } from 'src/redux/slices/appSlice';
import SearchBar from 'src/Components/SearchBar';
import Filter from 'src/Components/Filter';
import CompositionsList from 'src/Components/CompositionsList/CompositionsList';

import classes from './MainPage.module.scss';

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

  const handleNewLevelsSelected = (levels: string[]): void => {
    dispatch(setParams({ _limit: PAGE_SIZE, level: levels, _start: 0 }));
    dispatch(fetchCompositions());
  };

  const test = (value: string): void => {
    dispatch(setParams({ _limit: PAGE_SIZE, search_like: value, _start: 0 }));
    dispatch(fetchCompositions());
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer />
      <SearchBar onSearch={test} />
      <div className={classes.mainBlock}>
        <Filter onSelection={handleNewLevelsSelected} />
        <CompositionsList />
      </div>
    </div>
  );
};

export default MainPage;
