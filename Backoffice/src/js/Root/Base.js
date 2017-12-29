/*
This file is part of Street Veredict.

Street Veredict - An API/Website/Backoffice to share opinions on a given topic.
Copyright (C) 2017  Pau Torrents I Gallego - Eduard Maestro Martinez

Street Veredict is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Street Veredict is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Street Veredict program.  If not, see <https://www.gnu.org/licenses/>.
*/


import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../Home/containers/Home'

import Topics from '../Topics/containers/Topics'
import CreateTopic from '../Topics/containers/CreateTopic'
import EditTopic from '../Topics/containers/EditTopic'

import Authors from '../Authors/containers/Authors'
import CreateAuthor from '../Authors/containers/CreateAuthor'
import EditAuthor from '../Authors/containers/EditAuthor'

import Posts from '../Posts/containers/Posts'
import CreatePost from '../Posts/containers/CreatePost'
import EditPost from '../Posts/containers/EditPost'

class Base extends React.Component {
    render() {
        const { success, error } = this.props
        return (
            <Router>
                <div className="container">
                    {error &&
                        <div className="sv-top-alert-error">
                            <span>{ error }</span>
                        </div>
                    }
                    {success &&
                        <div className="sv-top-alert-success">
                            <span>{ success }</span>
                        </div>
                    }
    
                    <Route exact path="/" component={Home} />
    
                    <Route exact path="/topics" component={Topics} />
                    <Route exact path="/topics/create" component={CreateTopic} />
                    <Route path="/topics/edit/:topicId" component={EditTopic} />

                    <Route exact path="/authors" component={Authors} />
                    <Route exact path="/authors/create" component={CreateAuthor} />
                    <Route path="/authors/edit/:authorId" component={EditAuthor} />

                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/posts/create" component={CreatePost} />
                    <Route path="/posts/edit/:postId" component={EditPost} />
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state
    
    const {
        success,
        error
    } = rootReducer || {
        success: null,
        error: null
    }

    return {
        success,
        error
    }
}

export default connect(mapStateToProps)(Base)