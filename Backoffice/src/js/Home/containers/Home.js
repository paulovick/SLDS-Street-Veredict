import React from 'react'
import { connect } from 'react-redux'
import BackofficeModuleList from '../components/BackofficeModuleList';

class Home extends React.Component {
    render() {
        let modules = [
            {
                name: "Topics",
                link: "/topics"
            },
            {
                name: "Posts",
                link: "/posts"
            },
            {
                name: "Authors",
                link: "/authors"
            }
        ]
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Backoffice</strong></i></h4>
                </div>
                <BackofficeModuleList modules={modules} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Home)