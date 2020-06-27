import React, { useEffect } from 'react';
import classes from './Error.module.scss';

export default function ErrorHandler(props) {
  const scrolltop = document.documentElement.scrollTop;

  const { clearError } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      clearError();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [clearError]);

  return (
    <div
      onClick={clearError}
      style={{ transform: `translate(0, ${scrolltop}px)` }}
      className={classes.Error}
    >
      {props.message}
    </div>
  );
}
