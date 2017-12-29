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

function convertDate(date) {
    var result = new Date(date).toISOString()
    return result
}

const PostSingle = ({ post }) => (
    <div className="card-panel sv-post-container">
        <p className=" sv-post-date">{convertDate(post.createdAt)}</p>
        <h1 className="sv-post-title">{post.title}</h1>
        <h2 className="sv-post-author">{post.author.name}</h2>
        <hr />
        <div dangerouslySetInnerHTML={{ __html : post.content }}></div>
    </div>
)

PostSingle.propTypes = {
    post: PropTypes.object.isRequired
}

export default PostSingle