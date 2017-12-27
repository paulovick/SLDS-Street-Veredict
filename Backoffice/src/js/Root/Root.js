import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Base from './Base'

let store = configureStore()

const Root = () => (
    <Provider store={store}>
        <Base />
    </Provider>
)

export default Root