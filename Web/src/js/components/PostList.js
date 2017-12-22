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
import { NavLink } from 'react-router-dom'

const PostList = ({ posts }) => (
    <div>
        <div className="collection">
            {posts.map((post) => {
                if (post.type === 'full') {
                    return (
                        <NavLink className="collection-item" to={`/posts/${post.id}`} >
                            <span>{post.title}</span>
                            <span className="secondary-content">{post.author.name}</span>
                        </NavLink>
                    )
                } else if (post.type === 'link') {
                    return (
                        <a className="collection-item" href={post.author.link + '/' + post.link} >
                            <span>{post.title}</span>
                            <span className="secondary-content">{post.author.name}</span>
                        </a>
                    )
                }
            })}
        </div>
    </div>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList