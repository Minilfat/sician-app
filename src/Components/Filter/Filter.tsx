/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import classnames from 'classnames';

import Level from 'src/Components/Level';
import { ReactComponent as FilterImage } from 'src/assets/icons/filter.svg';

import classes from './Filter.module.scss';

type LevelSelection = {
  [key: number]: boolean;
};

type FilterProps = {
  onSelection: (levels: string[]) => void;
};

const Filter: FC<FilterProps> = ({ onSelection }: FilterProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<LevelSelection>({});
  const [isRangeShown, setIsRangeShown] = useState<boolean>(false);

  const handleLevelClicked = (level: number): void => {
    setSelected((prevSelected) => ({ ...prevSelected, [level]: !prevSelected[level] }));
  };

  const getLevelLabels = (): string => {
    const filteredKeys = Object.keys(selected).filter((k) => selected[Number(k)]);
    return filteredKeys.join(',');
  };

  useEffect(() => {
    const rangeShouldBeShown =
      !isOpened && Object.keys(selected).length > 0 && Object.keys(selected).some((k) => selected[Number(k)]);

    setIsRangeShown(rangeShouldBeShown);
  }, [isOpened]);

  useEffect(() => {
    const filteredKeys = Object.keys(selected).filter((k) => selected[Number(k)]);
    onSelection(filteredKeys);
  }, [selected]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.label} onClick={(): void => setIsOpened(!isOpened)}>
        <SwitchTransition>
          <CSSTransition
            timeout={600}
            key={isOpened ? 'key1' : 'key2'}
            addEndListener={(node, done): void => node.addEventListener('transitionend', done, false)}
            classNames={{
              enter: classes.fadeEnter,
              enterActive: classes.fadeEnterActive,
              exit: classes.fadeExit,
              exitActive: classes.fadeExitActive
            }}
          >
            <div className={classes.text}>{isOpened ? 'Hide filter' : 'Filter by level'}</div>
          </CSSTransition>
        </SwitchTransition>

        <div className={classnames(classes.filterLabel, { [classes.filterLabelWithRange]: isRangeShown })}>
          <CSSTransition
            in={isRangeShown}
            timeout={300}
            unmountOnExit
            classNames={{
              enter: classes.rangeTextTransitionEnter,
              enterActive: classes.rangeTextTransitionEnterActive,
              exit: classes.rangeTextTransitionExit,
              exitActive: classes.rangeTextTransitionExitActive
            }}
          >
            <div className={classes.text}>
              <span>{getLevelLabels()}</span>
            </div>
          </CSSTransition>

          <div className={classes[isRangeShown ? 'iconWithRange' : 'icon']}>
            <FilterImage />
          </div>
        </div>
      </div>

      <CSSTransition
        in={isOpened}
        timeout={600}
        unmountOnExit
        classNames={{
          enter: classes.listTransitionEnter,
          enterActive: classes.listTransitionEnterActive,
          exit: classes.listTransitionExit,
          exitActive: classes.listTransitionExitActive
        }}
      >
        <div>
          <div className={classes.levels}>
            {new Array(15).fill(1).map((item, index) => {
              const level = index + item;

              return (
                <div
                  key={`key${level}`}
                  data-testid={`level${level}`}
                  className={classes.level}
                  onClick={(): void => handleLevelClicked(level)}
                >
                  <Level level={level} isChecked={selected[level]} />
                </div>
              );
            })}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Filter;
