import { TActionsAll } from '../actions/index'
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../action-types'

type TOrder = {
  createdAt: string
  name: string
  number: number
  status: string
  updatedAt: string
  id: string
  ingredients: string[]
}

type TWsData = {
  wsConnected: boolean
  orders: TOrder[]
  total: null | number
  totalToday: null | number
}

export const initialState: TWsData = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
}

export const wsReducer = (state = initialState, action: TActionsAll): TWsData => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return initialState

    case WS_CONNECTION_CLOSED:
      return initialState

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders
          ? action.payload.orders.map((order) => ({
              createdAt: order.createdAt,
              ingredients: order.ingredients,
              name: order.name,
              number: order.number,
              status: order.status,
              updatedAt: order.updatedAt,
              id: order._id,
            }))
          : [],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }

    default:
      return state
  }
}
