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
import { NavLink } from 'react-router-dom'

const TopicList = ({topics}) => (
    <div>
        <div className="collection">
            {topics.map((topic) => (
                <NavLink className="collection-item" to={`/topics/${topic.id}`}>{topic.name}</NavLink>
            ))}
        </div>
    </div>
)

TopicList.propTypes = {
    topics: PropTypes.array.isRequired
}

export default TopicList