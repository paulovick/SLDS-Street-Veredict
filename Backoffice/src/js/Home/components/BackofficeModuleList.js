import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const BackofficeModuleList = ({modules}) => (
    <div className="card-panel">
        <div className="row">
            {modules.map((module) => (
                <div key={module.name} className="col s4">
                    <NavLink to={module.link}>
                        <div className="card-panel center-align valign-wrapper sv-bo-module-card">
                            {module.name}
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
    </div>
)

BackofficeModuleList.propTypes = {
    modules: PropTypes.array.isRequired
}

export default BackofficeModuleList