import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from "./reducers";

const isProduction = process.env.NODE_ENV === 'production'
export const history = createBrowserHistory()
const middleware = routerMiddleware(history)

export let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, middleware))
)

if (isProduction) {
    store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk, middleware))
    )
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>