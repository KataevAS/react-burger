import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../action-types'

export const setCurrentIngredient = (ingredient) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_INGREDIENT,
    ingredient,
  })
}

export const deleteCurrentIngredient = () => (dispatch) => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENT,
  })
}