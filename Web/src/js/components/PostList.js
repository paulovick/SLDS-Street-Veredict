import React from 'react'
import PropTypes from 'prop-types'

const PostList = ({ posts }) => (
    <div>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                {post.type === 'full' &&
                    <span>{post.title} ({post.author.name})</span>
                }
                {post.type === 'link' &&
                    <a href={post.author.link + '/' + post.link}>
                        {post.title} ({post.author.name})
                    </a>
                }
                </li>
            ))}
        </ul>
    </div>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList