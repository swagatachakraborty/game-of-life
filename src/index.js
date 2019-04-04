import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const BOUNDS = { topLeft: [0, 0], bottomRight: [5, 5] };

ReactDOM.render(<App bound={BOUNDS} />, document.getElementById('root'));
