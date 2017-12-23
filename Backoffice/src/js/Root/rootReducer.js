import { combineReducers } from 'redux'
import topicsReducer from '../Topics/reducers/topicsReducer'

const rootReducer = combineReducers({
    topicsReducer
})

export default rootReducer