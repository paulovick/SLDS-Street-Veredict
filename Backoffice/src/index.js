import React from 'react';
import ReactDOM from 'react-dom';
import './css/external.min.css';
import './css/site.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
