
import React from 'react'
import PropTypes from 'prop-types'
import AuthorRow from './AuthorRow'

const AuthorList = ({isFetching, authors}) => (
    <div className="card-panel sv-topic-list">
        <table>
            <thead>
                <tr>
                    <th className="sv-table-cell-id right-align">Id</th>
                    <th>Name</th>
                    <th className="sv-table-cell-posts"># posts</th>
                    <th className="sv-table-cell-created-at">Created At</th>
                    <th className="sv-table-cell-edit"></th>
                    <th className="sv-table-cell-delete"></th>
                </tr>
            </thead>

            <tbody>
                {!isFetching && authors.map((author) => (
                        <AuthorRow key={author.id} author={author} />
                    ))
                }
            </tbody>
        </table>
        {isFetching &&
            <div>Loading...</div>
        }
    </div>
)

AuthorList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    authors: PropTypes.array.isRequired
}

export default AuthorList