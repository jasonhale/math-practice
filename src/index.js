import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import initialState from './tools/initialState';

const initialSettings = (localStorage.getItem('mathpractice')) ? JSON.parse(localStorage.getItem('mathpractice')) : initialState;

ReactDOM.render(
  <App
    operations={initialSettings.operations}
    count={initialSettings.count}
    operands={initialSettings.operands}
    probStyle={initialSettings.probStyle}
  />,
  document.getElementById('root')
);
