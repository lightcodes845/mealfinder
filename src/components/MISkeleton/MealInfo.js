import React from 'react';
import classes from './MealInfo.module.scss';
// import ReactPlayer from 'react-player/lazy';

export default function MealInfo(props) {
  return (
    <div className={classes.meal__info}>
      <div className={[classes.meal__video, classes.loading].join(' ')}></div>
      <div
        className={[classes.meal__categories, classes.loading].join(' ')}
      ></div>
      <div
        className={[classes.meal__instruction, classes.loading].join(' ')}
      ></div>
      <div className={[classes.meal__ingredient].join(' ')}>
        <div className={[classes.meal__ingredients].join(' ')}>
          {[1, 2, 3, 4, 5, 6].map((value, i) => (
            <span className={classes.loading} key={value + '' + i}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
