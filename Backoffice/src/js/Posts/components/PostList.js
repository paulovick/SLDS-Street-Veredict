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
import PropTypes from 'prop-types'
import PostRow from './PostRow'
import PostFilter from './PostFilter'

const PostList = ({isFetching, posts}) => (
    <div className="card-panel sv-topic-list">
        <PostFilter />
        <table className="responsive-table">
            <thead>
                <tr>
                    <th className="sv-table-cell-id right-align">Id</th>
                    <th>Title</th>
                    <th className="sv-table-cell-author">Author</th>
                    <th className="sv-table-cell-created-at">Created At</th>
                    <th className="sv-table-cell-edit"></th>
                    <th className="sv-table-cell-delete"></th>
                </tr>
            </thead>

            <tbody>
                {!isFetching && posts.map((post) => (
                        <PostRow key={post.id} post={post} />
                    ))
                }
            </tbody>
        </table>
        {isFetching &&
            <div>Loading...</div>
        }
    </div>
)

PostList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired
}

export default PostList