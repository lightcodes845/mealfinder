import React from 'react';
import classes from './SearchForm.module.scss';
import { ReactComponent as Zoom } from '../../imgs/zoom.svg';
import { ReactComponent as Shuffle } from '../../imgs/arrows-shuffle-symbol.svg';

export default function SearchForm(props) {
  return (
    <div className={classes.searchcontainer}>
      <form onSubmit={props.handleSubmit} className={classes.form}>
        <input
          className={classes.search__input}
          type="text"
          value={props.query}
          onChange={e => props.change(e.target.value)}
          placeholder="Search for meals or keywords"
        />
        <button type="submit" className={classes.searchbtn}>
          <Zoom className={classes.ZOOM} />
        </button>
      </form>
      <button onClick={props.handleRandom} className={classes.random}>
        <Shuffle className={classes.Shuffle} />
      </button>
    </div>
  );
}
