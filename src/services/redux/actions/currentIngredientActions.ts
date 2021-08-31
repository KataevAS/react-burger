import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../action-types'
import { Dispatch } from 'redux'

export type TCurrentIngredientActions = ISetCurrentIngredient | IDeleteCurrentIngredient

type AppDispatch = Dispatch<TCurrentIngredientActions>

export type TIngredient = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT
  readonly ingredient: TIngredient
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT
}

export const setCurrentIngredient = (ingredient: TIngredient) => async (dispatch: AppDispatch) => {
  dispatch({
    type: SET_CURRENT_INGREDIENT,
    ingredient,
  })
}

export const deleteCurrentIngredient = () => (dispatch: AppDispatch) => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENT,
  })
}
