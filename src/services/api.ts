import { TNewUserData } from './redux/actions/userActions'
import { TIngredients } from './redux/actions/currentIngredientsActions'
import { getCookie } from '../utils/cookie'

const URL_REGISTER_USER = 'https://norma.nomoreparties.space/api/auth/register'
const URL_LOGIN_USER = 'https://norma.nomoreparties.space/api/auth/login'
const URL_GET_USER = 'https://norma.nomoreparties.space/api/auth/user'
const URL_REFRESH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token'
const URL_LOGOUT_USER = 'https://norma.nomoreparties.space/api/auth/logout'
const URL_GET_ORDERS_ALL = 'https://norma.nomoreparties.space/orders/all'
const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

export interface IUserRegForm {
  name: string
  email: string
  password: string
}

export interface ILoginForm {
  email: string
  password: string
}

export type TUser = {
  email: string
  name: string
  _id?: string
}

type TLoginRequest = {
  accessToken: string
  refreshToken: string
  success: boolean
  user: TUser
}

type TSignOut = {
  success: boolean
  message: string
}

type TGetIngredients = { success: boolean; message: string; data: TIngredients }

export const registrationUser = async (user: IUserRegForm): Promise<TLoginRequest> => {
  return await fetch(URL_REGISTER_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}

export const loginRequest = async (form: ILoginForm): Promise<TLoginRequest> => {
  return await fetch(URL_LOGIN_USER, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}

export const getUserData = async (): Promise<TLoginRequest | undefined> => {
  if (!getCookie('token')) {
    return undefined
  }
  return await fetch(URL_GET_USER, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    referrerPolicy: 'no-referrer',
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}

export const patchUserData = async (userData: TNewUserData) => {
  return await fetch(URL_GET_USER, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(userData),
    referrerPolicy: 'no-referrer',
  })
}

export const refreshToken = async (): Promise<TLoginRequest | undefined> => {
  return await fetch(URL_REFRESH_TOKEN, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}

export const signOut = async (): Promise<TSignOut> => {
  return await fetch(URL_LOGOUT_USER, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}

export const getOrdersAll = async () => {
  return await fetch(URL_GET_ORDERS_ALL, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  })
}

export const getIngredients = async (): Promise<TGetIngredients> => {
  return await fetch(URL_INGREDIENTS).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Ошибка HTTP: ' + res.status))
  })
}
