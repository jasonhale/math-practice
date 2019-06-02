import React from 'react';
import './Footer.css';

export default function Footer() {
  const Y = new Date().getFullYear(); // for current year in footer for copyright declaration.
  return (
    <footer>
      <span className="copyright">&copy;{Y} IEatPaint Studio&trade;</span>
    </footer>
  );
}