import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTopics } from '../actions'
import TopicList from '../components/TopicList'

class Home extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTopics())
    }

    render() {
        const { isFetching, topics } = this.props
        return (
            <div>
                {isFetching &&
                    <p>Loading...</p>
                }
                {!isFetching && topics.length === 0 &&
                    <p>There are no topics to show.</p>
                }
                {!isFetching && topics.length > 0 &&
                    <TopicList topics={topics} />
                }
            </div>
        )
    }
}

Home.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicList } = state
    const {
        isFetching,
        items: topics
    } = topicList || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        topics
    }
}

export default connect(mapStateToProps)(Home)