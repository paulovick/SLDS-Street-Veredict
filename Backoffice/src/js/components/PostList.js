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