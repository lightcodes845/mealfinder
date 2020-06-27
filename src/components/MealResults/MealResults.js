import React from 'react';
import classes from './MealResults.module.scss';

export default function MealResults(props) {
  return (
    <div className={classes.meal__results}>
      {props.alldata.map(data => (
        <div key={data.id} className={classes.meal__result} data-id={data.id}>
          <figure>
            <img src={data.imageURL} alt={data.title} />
            <figcaption>{data.title}</figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
