
import React from 'react'
import PropTypes from 'prop-types'
import PostRow from './PostRow'

const PostList = ({isFetching, posts}) => (
    <div className="card-panel sv-topic-list">
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