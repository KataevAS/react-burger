import { getUserData, loginRequest, patchUserData, refreshToken, signOut } from '../../api'
import { clearCookie, setCookie } from '../../../utils/cookie'

import {
  SET_USER,
  REMOVE_USER,
  SET_USER_ERROR,
  SET_USER_REQUEST,
  SET_SENT_EMAIL_FORGOT_PASSWORD,
  SET_RESET_PASSWORD_STATUS,
  SET_INITIAL_RESET_PASSWORD_STATUS,
  CHANGE_USER_DATA,
  SET_LOAD_STATUS_TRUE,
  SET_LOAD_STATUS_FALSE,
} from '../action-types'

const URL_REGISTER_USER = 'https://norma.nomoreparties.space/api/auth/register'
const URL_EMAIL_FORGOT_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset'
const URL_RESET_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset/reset'

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
  dispatch({ type: SET_INITIAL_RESET_PASSWORD_STATUS })
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
        dispatch({
          type: REMOVE_USER,
        })
      }
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message)
    }
  }

  setData()
}
