import React from 'react';
import './Button.css';

export default function Button(props) {
  const {classes, icon, ...otherProps} = props;

  return (
    <button
      className={`button ${classes}`}
      {...otherProps}
    >
      {icon && <i className={`button__icon fa ${icon}`} />}
      {props.children}
    </button>
  );
};
