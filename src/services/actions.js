export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS',
  SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR',
  SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST',
  SET_CURRENT_INGREDIENTS = 'SET_CURRENT_INGREDIENTS',
  SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT',
  SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS',
  SET_ORDER_REQUEST = 'SET_ORDER_REQUEST',
  SET_ORDER_ERROR = 'SET_ORDER_ERROR',
  DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT',
  DELETE_CURRENT_INGREDIENTS = 'DELETE_CURRENT_INGREDIENTS',
  CHANGE_CURRENT_ITEM_INDEX = 'CHANGE_CURRENT_ITEM_INDEX'

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'
const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders'

export const getIngredients = () => (dispatch) => {
  const getData = async () => {
    try {
      const res = await fetch(URL_INGREDIENTS)
      if (!res.ok) {
        dispatch({
          type: SET_INGREDIENTS_REQUEST,
        })
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      const data = await res.json()
      dispatch({
        type: SET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
      })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
      dispatch({
        type: SET_INGREDIENTS_ERROR,
      })
    }
  }

  getData()
}

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

export const getOrder = (currentIngredients) => (dispatch) => {
  const getOrderData = async () => {
    try {
      const res = await fetch(URL_GET_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          ingredients: currentIngredients,
        }),
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
