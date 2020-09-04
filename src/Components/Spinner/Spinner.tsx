import React, { FC } from 'react';

import classes from './Spinner.module.scss';

const Spinner: FC = () => (
  <div className={classes.spinner}>
    <div className={classes.bounce1} />
    <div className={classes.bounce2} />
    <div className={classes.bounce3} />
  </div>
);

export default Spinner;
