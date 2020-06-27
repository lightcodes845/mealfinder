import React from 'react';
import classes from './MRSkeleton.module.scss';

export default function MealResults(props) {
  return (
    <div className={classes.meal__results}>
      {[1, 2, 3].map((data, i) => (
        <div key={i} className={classes.meal__result}>
          <figure
            className={classes.loading}
            style={{ width: '100%', height: '18rem' }}
          >
            <figcaption
              style={{
                backgroundColor: 'rgb(209, 209, 209)',
                width: '100%',
                margin: '0 auto',
                height: '3rem',
              }}
            ></figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
