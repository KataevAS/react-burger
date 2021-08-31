import { TUser } from './../../api'
import { Dispatch } from 'redux'
import {
  getUserData,
  loginRequest,
  patchUserData,
  refreshToken,
  registrationUser,
  signOut,
  IUserRegForm,
  ILoginForm,
} from '../../api'
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

export type TUserActions =
  | ISetUser
  | ISetUserRequest
  | ISetUserError
  | ISetLoadStatusTrue
  | IChangeUserData
  | ISetLoadStatusFalse
  | ISetSentEmailForgotPassword
  | IRemoveUser
  | ISetInitialResetPasswordStatus
  | ISetResetPasswordStatus

type AppDispatch = Dispatch<TUserActions>

interface ISetUser {
  readonly type: typeof SET_USER
  readonly user: TUser
}

interface ISetUserRequest {
  readonly type: typeof SET_USER_REQUEST
}

interface ISetUserError {
  readonly type: typeof SET_USER_ERROR
}

interface ISetLoadStatusTrue {
  readonly type: typeof SET_LOAD_STATUS_TRUE
}

interface ISetLoadStatusFalse {
  readonly type: typeof SET_LOAD_STATUS_FALSE
}

interface IChangeUserData {
  readonly type: typeof CHANGE_USER_DATA
  readonly user: Omit<TNewUserData, 'password'>
}

interface ISetSentEmailForgotPassword {
  readonly type: typeof SET_SENT_EMAIL_FORGOT_PASSWORD
}

interface ISetInitialResetPasswordStatus {
  readonly type: typeof SET_INITIAL_RESET_PASSWORD_STATUS
}

interface ISetResetPasswordStatus {
  readonly type: typeof SET_RESET_PASSWORD_STATUS
}
interface IRemoveUser {
  readonly type: typeof REMOVE_USER
}

export type TNewUserData = {
  name?: string
  email?: string
  password?: string
}

const URL_EMAIL_FORGOT_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset'
const URL_RESET_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset/reset'

export const registration = (user: IUserRegForm) => async (dispatch: AppDispatch) => {
  try {
    const data = await registrationUser(user)
    if (!data.success) {
      dispatch({ type: SET_USER_REQUEST })
    }
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

export const getUser = () => async (dispatch: AppDispatch) => {
  try {    
    let data = await getUserData()
    if (data && !data.success) {
      const dataUpd = await refreshToken()
      if (dataUpd && dataUpd.success) {
        dataUpd.accessToken && setCookie('token', dataUpd.accessToken.split('Bearer ')[1])
        dataUpd.refreshToken && setCookie('refreshToken', dataUpd.refreshToken)
        data = await getUserData()
      }
    }
    if (data && data.success) {
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

export const changeUserData = (userData: TNewUserData) => (dispatch: AppDispatch) => {
  const newUserData: TNewUserData = {}
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

export const setForgotEmail = (email: string) => async (dispatch: AppDispatch) => {
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

export const resetPassword = (password: string, token: string) => (dispatch: AppDispatch) => {
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

export const setInitialResetPassword = () => (dispatch: AppDispatch) => {
  dispatch({ type: SET_INITIAL_RESET_PASSWORD_STATUS })
}

export const login = (form: ILoginForm) => async (dispatch: AppDispatch) => {
  try {
    const data = await loginRequest(form)
    if (!data.success) {
      dispatch({ type: SET_USER_REQUEST })
    }
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

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const data = await signOut()
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
