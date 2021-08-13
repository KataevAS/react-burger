import { getCookie } from '../../../utils/cookie'
import {
  SET_CURRENT_INGREDIENTS,
  DELETE_CURRENT_INGREDIENTS,
  CHANGE_CURRENT_ITEM_INDEX,
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
} from '../action-types'

const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders'

export const setCurrentIngredients = (itemType, price, id, name, image) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_INGREDIENTS,
    itemType,
    price,
    id,
    name,
    image,
  })
}

export const deleteCurrentIngredients = (uniqId) => (dispatch) => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENTS,
    uniqId,
  })
}

export const changeCurrentItemIndex =
  ({ id, index }) =>
  (dispatch) => {
    dispatch({
      type: CHANGE_CURRENT_ITEM_INDEX,
      id,
      index,
    })
  }

export const getOrder = (ingredients) => (dispatch) => {
  const getOrderData = async () => {
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

      dispatch({ type: SET_ORDER_SUCCESS, order: data.order.number })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
      dispatch({ type: SET_ORDER_ERROR })
    }
  }
  getOrderData()
}
