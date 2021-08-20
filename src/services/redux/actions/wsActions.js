import { getCookie } from '../../../utils/cookie'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../action-types'

export const wsConnect = () => {
  return {
    type: WS_CONNECTION_START,
  }
}

export const wsIsAuthConnect = () => {
  return {
    type: WS_CONNECTION_START,
    token: getCookie('token'),
  }
}

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  }
}
