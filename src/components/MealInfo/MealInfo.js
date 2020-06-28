import React from 'react';
import classes from './MealInfo.module.scss';
// import ReactPlayer from 'react-player/lazy';

export default function MealInfo(props) {
  const { data } = props;
  return (
    <div className={classes.meal__info}>
      {!props.randomMeal && <button onClick={props.back}>Back</button>}
      <h1>{data.title}</h1>
      {data.videoURL ? (
        <div className={classes.meal__video}>
          <iframe
            title={data.title}
            width="560"
            height="315"
            src={`${data.videoURL}?controls=1&loop=1&autoplay=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className={classes.meal__video}>
          <img src={data.imageURL} alt={data.title} />
        </div>
      )}
      <div className={classes.meal__categories}>
        <p>{data.category}</p>
        <p>{data.area}</p>
      </div>
      <div className={classes.meal__instruction}>{data.instructions}</div>
      <div className={classes.meal__ingredient}>
        <h2>Ingredients</h2>
        <div className={classes.meal__ingredients}>
          {data.ingredients.map((value, i) => (
            <span key={value + '' + i}>
              {value} - {data.measure[i]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
