import { TActionsAll } from './../actions/index'
import { TIngredient } from './../actions/currentIngredientActions'
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../action-types'

type TCurrentIngredientState = { ingredient: TIngredient | null }

const initialState: TCurrentIngredientState = {
  ingredient: null,
}

export const currentIngredientReducer = (state = initialState, action: TActionsAll): TCurrentIngredientState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ingredient: action.ingredient }

    case DELETE_CURRENT_INGREDIENT:
      return initialState

    default:
      return state
  }
}
