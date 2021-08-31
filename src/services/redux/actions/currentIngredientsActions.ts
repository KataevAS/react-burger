import { TIngredient } from './currentIngredientActions'
import { AppThunk } from './../store'
import { getCookie } from '../../../utils/cookie'
import {
  SET_CURRENT_INGREDIENTS,
  DELETE_CURRENT_INGREDIENTS,
  CHANGE_CURRENT_ITEM_INDEX,
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
  REMOVE_ORDER,
  REMOVE_ALL_CURRENT_INGREDIENTS,
} from '../action-types'

export type TCurrentIngredientsActions =
  | ISetCurrentIngredients
  | IDeleteCurrentIngredients
  | IRemoveAllCurrentIngredients
  | IChangeCurrentItemIndex
  | ISetOrderRequest
  | ISetOrderSuccess
  | ISetOrderError
  | IRemoveOrder

const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders'

interface ISetCurrentIngredients {
  readonly type: typeof SET_CURRENT_INGREDIENTS
  readonly itemType: string
  readonly price: number
  readonly id: string
  readonly name: string
  readonly image: string
}

interface IDeleteCurrentIngredients {
  readonly type: typeof DELETE_CURRENT_INGREDIENTS
  readonly uniqId: string
}

interface IRemoveAllCurrentIngredients {
  readonly type: typeof REMOVE_ALL_CURRENT_INGREDIENTS
}

interface IChangeCurrentItemIndex {
  readonly type: typeof CHANGE_CURRENT_ITEM_INDEX
  readonly id: string
  readonly index: number
}

interface ISetOrderRequest {
  readonly type: typeof SET_ORDER_REQUEST
}

interface ISetOrderSuccess {
  readonly type: typeof SET_ORDER_SUCCESS
  readonly order: number
}

export type TIngredients = TIngredient[]

interface ISetOrderError {
  readonly type: typeof SET_ORDER_ERROR
}

interface IRemoveOrder {
  readonly type: typeof REMOVE_ORDER
}

export const setCurrentIngredients: AppThunk =
  (itemType: string, price: number, id: string, name: string, image: string) => (dispatch) => {
    dispatch({
      type: SET_CURRENT_INGREDIENTS,
      itemType,
      price,
      id,
      name,
      image,
    })
  }

export const deleteCurrentIngredients: AppThunk = (uniqId: string) => (dispatch) => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENTS,
    uniqId,
  })
}

export const removeAllCurrentIngredients: AppThunk = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_CURRENT_INGREDIENTS,
  })
}

export const changeCurrentItemIndex: AppThunk =
  ({ id, index }: { id: string; index: number }) =>
  (dispatch) => {
    dispatch({
      type: CHANGE_CURRENT_ITEM_INDEX,
      id,
      index,
    })
  }

export const getOrder: AppThunk = (ingredients: string[]) => async (dispatch) => {
  try {
    const res = await fetch(URL_GET_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify({ ingredients }),
    })
    if (!res.ok) {
      dispatch({ type: SET_ORDER_REQUEST })
      throw new Error('Ошибка HTTP: ' + res.status)
    }
    const data = await res.json()
    dispatch({ type: REMOVE_ALL_CURRENT_INGREDIENTS })
    dispatch({ type: SET_ORDER_SUCCESS, order: data.order.number })
  } catch (error) {
    console.log('Возникла проблема с fetch запросом: ', error.message)
    dispatch({ type: SET_ORDER_ERROR })
  }
}

export const removeOrder: AppThunk = () => (dispatch) => {
  dispatch({ type: REMOVE_ORDER })
}
