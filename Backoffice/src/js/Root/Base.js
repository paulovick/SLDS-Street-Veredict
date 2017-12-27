import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../Home/containers/Home'
import Topics from '../Topics/containers/Topics'
import CreateTopic from '../Topics/containers/CreateTopic'
// import EditTopic from '../Topics/containers/EditTopic'

class Base extends React.Component {
    render() {
        const { success, error } = this.props
        return (
            <Router>
                <div className="container">
                    {error &&
                        <div className="sv-top-alert-error">
                            <span>{ error }</span>
                        </div>
                    }
                    {success &&
                        <div className="sv-top-alert-success">
                            <span>{ success }</span>
                        </div>
                    }
    
                    <Route exact path="/" component={Home} />
    
                    <Route exact path="/topics" component={Topics} />
                    <Route exact path="/topics/create" component={CreateTopic} />
                    {/* <Route path="/topics/edit/:topicId" component={EditTopic} /> */}
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state
    
    const {
        success,
        error
    } = rootReducer || {
        success: null,
        error: null
    }

    return {
        success,
        error
    }
}

export default connect(mapStateToProps)(Base)