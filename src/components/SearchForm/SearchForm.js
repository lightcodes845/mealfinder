import React from 'react';
import classes from './SearchForm.module.scss';
import { ReactComponent as Zoom } from '../../imgs/zoom.svg';
import { ReactComponent as Shuffle } from '../../imgs/arrows-shuffle-symbol.svg';

export default function SearchForm() {
  return (
    <div className={classes.searchcontainer}>
      <form className={classes.form}>
        <input
          className={classes.search__input}
          type="text"
          placeholder="Search for meals or keywords"
        />
        <button type="submit" className={classes.searchbtn}>
          <Zoom className={classes.ZOOM} />
        </button>

        <button className={classes.random}>
          <Shuffle className={classes.Shuffle} />
        </button>
      </form>
    </div>
  );
}
