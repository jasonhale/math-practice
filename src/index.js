import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import initialState from './initialState';

ReactDOM.render(
  <App
    operations={initialState.operations}
    count={initialState.count}
    operands={initialState.operands}
    probStyle={initialState.probStyle}
  />,
  document.getElementById('root')
);
