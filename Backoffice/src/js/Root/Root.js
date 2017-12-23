import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Home from '../Home/containers/Home'
import Topics from '../Topics/containers/Topics'

let store = configureStore()

const Root = () => (
    <Provider store={store}>
        <Router>
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/topics" component={Topics} />
            </div>
        </Router>
    </Provider>
)

export default Root