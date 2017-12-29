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
import { connect } from 'react-redux'
import { modifyFilter } from '../actions/postFilterActions'
import { getPosts } from '../actions/postsActions'

class PostFilter extends React.Component {
    render() {
        const { filter, dispatch } = this.props
        return (
            <div className="row">
                <div className="input-field col s4">
                    <input id="sv-post-filter-title-id"
                        type="text"
                        onBlur={(e) => {
                            var value = e.target.value ? e.target.value : null
                            dispatch(modifyFilter(filter, 'title', value))
                        }}
                    />
                    <label htmlFor="#sv-post-filter-title-id"
                        className="active">Title</label>
                </div>
                <div className="input-field col s3">
                    <input id="sv-post-filter-author-id"
                        type="text"
                        onBlur={(e) => {
                            var value = e.target.value ? e.target.value : null
                            dispatch(modifyFilter(filter, 'authorName', value))
                        }}
                    />
                    <label htmlFor="#sv-post-filter-author-id"
                        className="active">Author</label>
                </div>
                <div className="input-field col s3">
                    <input id="sv-post-filter-topic-id"
                        type="text"
                        onBlur={(e) => {
                            var value = e.target.value ? e.target.value : null
                            dispatch(modifyFilter(filter, 'topicName', value))
                        }}
                    />
                    <label htmlFor="#sv-post-filter-topic-id"
                        className="active">Topic</label>
                </div>
                <div className="col s2 valign-wrapper right">
                    <button
                        onClick={() => dispatch(getPosts(filter))}
                        className="waves-effect waves-light btn orange"
                    ><i className="material-icons">search</i></button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { postsReducer } = state
    const postList = postsReducer ? postsReducer.postList : null
    const {
        filter
    } = postList || {
        filter: {}
    }

    return {
        filter
    }
}

export default connect(mapStateToProps)(PostFilter)