import { getCookie } from '../../../utils/cookie'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../action-types'

type TOrder = {
  createdAt: string
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
  ingredients: string[]
}

type TMessage = {
  orders: [] | TOrder[]
  total: null | number
  totalToday: null | number
}

export type TWsActions =
  | IWsConnectionStart
  | IWsIsAuthConnect
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
}

interface IWsIsAuthConnect {
  readonly type: typeof WS_CONNECTION_START
  readonly token: string | undefined
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: TMessage
}

export const wsConnect = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  }
}

export const wsIsAuthConnect = (): IWsIsAuthConnect => {
  return {
    type: WS_CONNECTION_START,
    token: getCookie('token'),
  }
}

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message: TMessage): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  }
}
