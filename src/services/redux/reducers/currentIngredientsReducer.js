import { nanoid } from 'nanoid'

import {
  SET_CURRENT_INGREDIENTS,
  DELETE_CURRENT_INGREDIENTS,
  CHANGE_CURRENT_ITEM_INDEX,
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
} from '../action-types'

const initialState = {
  bun: null,
  all: [],
  order: null,
}

export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENTS:
      const { itemType, price, id, name, image } = action
      if (itemType === 'bun') {
        return {
          ...state,
          bun: { price, id, name, image, uniqId: nanoid() },
        }
      } else {
        return {
          ...state,
          all: [...state.all, { price, id, name, image, uniqId: nanoid() }],
        }
      }

    case DELETE_CURRENT_INGREDIENTS:
      return {
        ...state,
        all: state.all.filter((item) => item.uniqId !== action.uniqId),
      }

    case SET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
      }

    case SET_ORDER_REQUEST:
      return {
        ...state,
        order: initialState.order,
      }

    case SET_ORDER_ERROR:
      return {
        ...state,
        order: initialState.order,
      }

    case CHANGE_CURRENT_ITEM_INDEX:
      const lastId = state.all.findIndex((item) => item.uniqId === action.id)
      if (Math.min(lastId, action.index) < 0 || Math.max(lastId, action.index) >= state.all.length) {
        return state
      }
      const item = state.all.splice(lastId, 1)
      const newAll = [...state.all.slice(0, action.index), item[0], ...state.all.slice(action.index, state.all.length)]
      return {
        ...state,
        all: newAll,
      }

    default:
      return state
  }
}
