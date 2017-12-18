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