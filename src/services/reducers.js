import { combineReducers } from 'redux'
import { nanoid } from 'nanoid'

import {
  SET_INGREDIENTS_SUCCESS,
  SET_INGREDIENTS_ERROR,
  SET_INGREDIENTS_REQUEST,
  SET_CURRENT_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
  DELETE_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENTS,
  CHANGE_CURRENT_ITEM_INDEX,
} from './actions'

const initialIngredients = {
  buns: [],
  sauce: [],
  mains: [],
  requestIngredients: false,
}
const initialCurrentIngredients = {
  bun: null,
  all: [],
  order: null,
}
const initialCurrentIngredient = null

const ingredients = (state = initialIngredients, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        buns: action.ingredients.filter((item) => item.type === 'bun'),
        sauce: action.ingredients.filter((item) => item.type === 'sauce'),
        mains: action.ingredients.filter((item) => item.type === 'main'),
        requestIngredients: false,
      }

    case SET_INGREDIENTS_REQUEST:
      return initialIngredients

    case SET_INGREDIENTS_ERROR:
      return initialIngredients

    default:
      return state
  }
}

const currentIngredients = (state = initialCurrentIngredients, action) => {
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
        order: initialCurrentIngredients.order,
      }

    case SET_ORDER_ERROR:
      return {
        ...state,
        order: initialCurrentIngredients.order,
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

const currentIngredient = (state = initialCurrentIngredient, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return action.ingredient

    case DELETE_CURRENT_INGREDIENT:
      return null

    default:
      return state
  }
}

export const rootReducer = combineReducers({
  ingredients,
  currentIngredients,
  currentIngredient,
})
