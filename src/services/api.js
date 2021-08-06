import { getCookie } from '../utils/cookie'

const URL_LOGIN_USER = 'https://norma.nomoreparties.space/api/auth/login'
const URL_GET_USER = 'https://norma.nomoreparties.space/api/auth/user'
const URL_REFRESH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token'
const URL_LOGOUT_USER = 'https://norma.nomoreparties.space/api/auth/logout'

export const loginRequest = async (form) => {
  return await fetch(URL_LOGIN_USER, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form),
  })
}

export const getUserData = async () => {
  if (!getCookie('token')) {
    return
  }
  return await fetch(URL_GET_USER, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    referrerPolicy: 'no-referrer',
  })
}

export const patchUserData = async (userData) => {
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

export const refreshToken = async () => {
  return await fetch(URL_REFRESH_TOKEN, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  })
}

export const signOut = async () => {
  return await fetch(URL_LOGOUT_USER, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  })
}
