import React from 'react';
import './Button.css';

function Button(props) {
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

export default Button;