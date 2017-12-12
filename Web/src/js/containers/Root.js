import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../stores/configureStore'
import Home from './Home'

let store = configureStore()

const Root = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={Home} />
        </Router>
    </Provider>
)

export default Root