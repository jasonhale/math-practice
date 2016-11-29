import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/styles.css';

import initialState from './initialState';

ReactDOM.render(
  <App
    operations={initialState.operations}
    count={initialState.count}
    minmax={initialState.minmax}
    probStyle={initialState.probStyle}
  />,
  document.getElementById('root')
);
