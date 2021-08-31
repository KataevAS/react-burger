import { RootState } from './../store'
import { Middleware } from 'redux'

type TWsActions = {
  wsInit: string
  onOpen: string
  onClose: string
  onError: string
  onMessage: string
}

export const createSocketMiddleware = (wsUrl: string, wsActions: TWsActions) => {
  const socketMiddleware: Middleware<{}, RootState> = (store) => {
    let socket: WebSocket | null = null
    return (next) => (action) => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsInit) {
        socket = payload?.token ? new WebSocket(`${wsUrl}?token=${payload.token}`) : new WebSocket(`${wsUrl}`)
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch({ type: onMessage, payload: restParsedData })
        }

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event })
        }
      }

      next(action)
    }
  }

  return socketMiddleware
}
