import { TIngredients } from './currentIngredientsActions'
import { Dispatch } from 'redux'
import { SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_ERROR, SET_INGREDIENTS_REQUEST } from '../action-types'
import { getIngredients } from '../../api'

export type TIngredientsActions = ISetIngredientsSuccess | ISetIngredientsRequest | ISetIngredientsError

type AppDispatch = Dispatch<TIngredientsActions>

interface ISetIngredientsSuccess {
  readonly type: typeof SET_INGREDIENTS_SUCCESS
  readonly ingredients: TIngredients
}

interface ISetIngredientsRequest {
  readonly type: typeof SET_INGREDIENTS_REQUEST
}

interface ISetIngredientsError {
  readonly type: typeof SET_INGREDIENTS_ERROR
}

export const setIngredients = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getIngredients()
    if (data.success) {
      dispatch({
        type: SET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
      })
    }
  } catch (error) {
    console.log('Возникла проблема с fetch запросом: ', error.message)
    dispatch({
      type: SET_INGREDIENTS_ERROR,
    })
  }
}
