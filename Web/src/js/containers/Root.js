import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../stores/configureStore'
import Home from './Home'
import Posts from './Posts'

let store = configureStore()

const Root = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/topics/:topicId" component={Posts} />
            </div>
        </Router>
    </Provider>
)

export default Root