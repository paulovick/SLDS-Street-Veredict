import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../stores/configureStore'
import Home from './Home'
import Topic from './Topic'
import Post from './Post'

let store = configureStore()

const Root = () => (
    <Provider store={store}>
        <Router>
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/topics/:topicId" component={Topic} />
                <Route path="/posts/:postId" component={Post} />
            </div>
        </Router>
    </Provider>
)

export default Root