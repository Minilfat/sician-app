import React, { FC } from 'react';
import classnames from 'classnames';

import classes from './Level.module.scss';

type LevelProps = {
  level: number;
};

const Level: FC<LevelProps> = ({ level }: LevelProps) => {
  const generatedClassnames = classnames(classes.wrapper, classes[`level-${level}`]);

  return (
    <div className={generatedClassnames}>
      <div>{level}</div>
    </div>
  );
};

export default Level;
