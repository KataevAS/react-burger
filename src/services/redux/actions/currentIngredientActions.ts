import { AppThunk } from './../store'
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../action-types'

export type TCurrentIngredientActions = ISetCurrentIngredient | IDeleteCurrentIngredient

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

export const setCurrentIngredient: AppThunk = (ingredient: TIngredient) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_INGREDIENT,
    ingredient,
  })
}

export const deleteCurrentIngredient: AppThunk = () => (dispatch) => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENT,
  })
}
