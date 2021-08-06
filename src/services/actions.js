import { clearCookie, setCookie } from '../utils/cookie'
import { getUserData, loginRequest, patchUserData, refreshToken, signOut } from './api'

export const SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
  SET_USER_ERROR = 'SET_USER_ERROR',
  SET_USER_REQUEST = 'SET_USER_REQUEST',
  SET_SENT_EMAIL_FORGOT_PASSWORD = 'SET_SENT_EMAIL_FORGOT_PASSWORD',
  SET_RESET_PASSWORD_STATUS = 'SET_RESET_PASSWORD_STATUS',
  SET_INITIAL_RESET_STATUS = 'SET_INITIAL_RESET_STATUS',
  SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS',
  SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR',
  SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST',
  SET_CURRENT_INGREDIENTS = 'SET_CURRENT_INGREDIENTS',
  SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT',
  SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS',
  SET_ORDER_REQUEST = 'SET_ORDER_REQUEST',
  SET_ORDER_ERROR = 'SET_ORDER_ERROR',
  DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT',
  DELETE_CURRENT_INGREDIENTS = 'DELETE_CURRENT_INGREDIENTS',
  CHANGE_CURRENT_ITEM_INDEX = 'CHANGE_CURRENT_ITEM_INDEX',
  SET_LOAD_STATUS_TRUE = 'SET_LOAD_STATUS_TRUE',
  SET_LOAD_STATUS_FALSE = 'SET_LOAD_STATUS_TRUE',
  CHANGE_USER_DATA = 'CHANGE_USER_DATA'

const URL_REGISTER_USER = 'https://norma.nomoreparties.space/api/auth/register'
const URL_EMAIL_FORGOT_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset'
const URL_RESET_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset/reset'
const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'
const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders'

export const registration = (user) => (dispatch) => {
  const setData = async () => {
    try {
      const res = await fetch(URL_REGISTER_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      })
      if (!res.ok) {
        dispatch({ type: SET_USER_REQUEST })
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      const data = await res.json()
      dispatch({
        type: SET_USER,
        user: data.user,
      })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
      dispatch({
        type: SET_USER_ERROR,
      })
    }
  }

  setData()
}

export const getUser = () => (dispatch) => {
  const goError = (status) => {
    dispatch({ type: SET_USER_REQUEST })
    throw new Error('Ошибка HTTP: ' + status)
  }

  const setData = async () => {
    try {
      const res = await getUserData()
      if (!res) {
        return
      }

      if (!res.ok) {
        if (res.status === 403) {
          const resUpd = await refreshToken()
          !resUpd && goError(resUpd.status)
          const data = await resUpd.json()
          if (data.success) {
            data.accessToken && setCookie('token', data.accessToken.split('Bearer ')[1])
            data.refreshToken && setCookie('refreshToken', data.refreshToken)
            setData()
            return
          }
        }

        goError(res.status)
      }

      const data = await res.json()
      if (data.success) {
        dispatch({
          type: SET_USER,
          user: data.user,
        })
      }
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
      dispatch({
        type: SET_USER_ERROR,
      })
    }
  }

  setData()
}

export const changeUserData = (userData) => (dispatch) => {
  const newUserData = {}
  userData.name && (newUserData.name = userData.name)
  userData.email && (newUserData.email = userData.email)
  userData.password && (newUserData.password = userData.password)
  const setData = async () => {
    try {
      dispatch({ type: SET_LOAD_STATUS_TRUE })
      const res = await patchUserData(newUserData)
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      const data = await res.json()
      if (data.success) {
        dispatch({ type: CHANGE_USER_DATA, user: data.user })
      }
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
    } finally {
      dispatch({ type: SET_LOAD_STATUS_FALSE })
    }
  }

  setData()
}

export const setForgotEmail = (email) => (dispatch) => {
  const setData = async () => {
    try {
      const res = await fetch(URL_EMAIL_FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      dispatch({ type: SET_SENT_EMAIL_FORGOT_PASSWORD })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
    }
  }

  setData()
}

export const resetPassword = (password, token) => (dispatch) => {
  const setData = async () => {
    try {
      const res = await fetch(URL_RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ password, token }),
      })
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      dispatch({ type: SET_RESET_PASSWORD_STATUS })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
    }
  }

  setData()
}

export const setInitialResetPassword = () => (dispatch) => {
  dispatch({ type: SET_INITIAL_RESET_STATUS })
}

export const login = (form) => (dispatch) => {
  const setData = async () => {
    try {
      const res = await loginRequest(form)
      if (!res.ok) {
        dispatch({ type: SET_USER_REQUEST })
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      const data = await res.json()
      if (data.accessToken) {
        setCookie('token', data.accessToken.split('Bearer ')[1])
      }
      if (data.refreshToken) {
        setCookie('refreshToken', data.refreshToken)
      }
      dispatch({
        type: SET_USER,
        user: { ...data.user, id: data.user._id },
      })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
      dispatch({
        type: SET_USER_ERROR,
      })
    }
  }

  setData()
}

export const logout = () => (dispatch) => {
  const setData = async () => {
    try {
      const res = await signOut()
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status)
      }
      const data = await res.json()
      if (data.success) {
        clearCookie()
      }
      dispatch({
        type: REMOVE_USER,
      })
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
    }
  }

  setData()
}

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

export const getOrder = (ingredients) => (dispatch) => {
  const getOrderData = async () => {
    try {
      const res = await fetch(URL_GET_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
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
