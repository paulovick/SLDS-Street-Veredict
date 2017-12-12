import 'babel-polyfill'
import registerServiceWorker from './js/registerServiceWorker'

//import './css/external.min.css'
//import './css/site.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './js/containers/Root'

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)
registerServiceWorker()
