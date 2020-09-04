import React, { FC } from 'react';
import classnames from 'classnames';

import classes from './Level.module.scss';

type LevelProps = {
  level: number;
  isChecked: boolean;
};

const Level: FC<LevelProps> = ({ level, isChecked = false }: LevelProps) => {
  const commonClasses = isChecked
    ? classnames(classes.wrapper, classes.checked)
    : classnames(classes.wrapper, classes[`level-${level}`]);

  return (
    <div className={commonClasses}>
      <div>{level}</div>
    </div>
  );
};

export default Level;
