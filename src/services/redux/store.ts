import { TActionsAll } from './actions/index'
import { applyMiddleware, createStore, compose, ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { rootReducer } from './reducers'
import { createSocketMiddleware } from './middleware'
import thunk from 'redux-thunk'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from './action-types'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const WSURL = 'wss://norma.nomoreparties.space/orders/all'

type TMiddlewareWsActions = {
  wsInit: typeof WS_CONNECTION_START
  onOpen: typeof WS_CONNECTION_SUCCESS
  onClose: typeof WS_CONNECTION_CLOSED
  onError: typeof WS_CONNECTION_ERROR
  onMessage: typeof WS_GET_MESSAGE
}

const wsActions: TMiddlewareWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const socketFeedOrdersMiddleware = createSocketMiddleware(WSURL, wsActions)

const enhancer = composeEnhancers(applyMiddleware(thunk, socketFeedOrdersMiddleware))

export const initStore = createStore(rootReducer, enhancer)
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof initStore.dispatch
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TActionsAll>>
