import React from 'react';
import './Button.css';

export const Button = ({classes, onClick, children}) => (
  <button className={`button ${classes}`} onClick={onClick}>
    {children}
  </button>
);