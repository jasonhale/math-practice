import React from 'react';
import './Button.css';

export default function Button(props) {
  const {className, icon, ...otherProps} = props;

  return (
    <button
      className={`button ${className}`}
      {...otherProps}
    >
      {icon && <i className={`button__icon fa ${icon}`} />}
      {props.children}
    </button>
  );
};
