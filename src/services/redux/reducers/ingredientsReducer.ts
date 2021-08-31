import { TIngredient } from './../actions/currentIngredientActions'
import { TActionsAll } from '../actions/index'
import { SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_ERROR, SET_INGREDIENTS_REQUEST } from '../action-types'

type TIngredients = {
  buns: TIngredient[]
  sauce: TIngredient[]
  mains: TIngredient[]
  requestIngredients: boolean
}

const initialState: TIngredients = {
  buns: [],
  sauce: [],
  mains: [],
  requestIngredients: false,
}

export const ingredientsReducer = (state = initialState, action: TActionsAll) => {
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
      return initialState

    case SET_INGREDIENTS_ERROR:
      return initialState

    default:
      return state
  }
}
