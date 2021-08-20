import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../action-types'

const initialState = null

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return action.ingredient

    case DELETE_CURRENT_INGREDIENT:
      return initialState

    default:
      return state
  }
}
