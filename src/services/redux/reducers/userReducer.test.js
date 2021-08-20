import { userReducer } from './userReducer'
import * as types from '../action-types/userActionTypes'

const initialState = {
  isAuth: false,
  isSentEmail: false,
  isResetPassword: false,
  isLoadPatch: false,
  userData: null,
}

describe('userReducer', () => {
  it('Должен вернуть начальное значение', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('Должен добавить пользователя, SET_USER', () => {
    expect(userReducer(undefined, { type: types.SET_USER, user: { name: 'My name', id: '1' } })).toEqual({
      ...initialState,
      isAuth: true,
      userData: { name: 'My name', id: '1' },
    })
  })

  it('Должен установить флаг isSentEmail в true, SET_SENT_EMAIL_FORGOT_PASSWORD', () => {
    expect(userReducer(undefined, { type: types.SET_SENT_EMAIL_FORGOT_PASSWORD })).toEqual({
      ...initialState,
      isSentEmail: true,
    })
  })

  it('Должен установить флаг isResetPassword в true, SET_RESET_PASSWORD_STATUS', () => {
    expect(userReducer(undefined, { type: types.SET_RESET_PASSWORD_STATUS })).toEqual({
      ...initialState,
      isResetPassword: true,
    })
  })

  it('Должен заменить имя и email пользователя, CHANGE_USER_DATA', () => {
    expect(
      userReducer(
        { ...initialState, isAuth: true, userData: { name: 'My name', email: 'My email' } },
        { type: types.CHANGE_USER_DATA, user: { name: 'New name', email: 'New email' } }
      )
    ).toEqual({
      ...initialState,
      isAuth: true,
      userData: { name: 'New name', email: 'New email' },
    })
  })

  it('Должен вернуть предыдущие имя и email пользователя, если они не были изменены, CHANGE_USER_DATA', () => {
    expect(
      userReducer(
        { ...initialState, isAuth: true, userData: { name: 'My name', email: 'My email' } },
        { type: types.CHANGE_USER_DATA, user: {} }
      )
    ).toEqual({
      ...initialState,
      isAuth: true,
      userData: { name: 'My name', email: 'My email' },
    })
  })

  it('Должен установить флаг isLoadPatch в true, SET_LOAD_STATUS_TRUE', () => {
    expect(userReducer(undefined, { type: types.SET_LOAD_STATUS_TRUE })).toEqual({
      ...initialState,
      isLoadPatch: true,
    })
  })

  it('Должен установить флаг isLoadPatch в false, SET_LOAD_STATUS_FALSE', () => {
    expect(userReducer({ ...initialState, isLoadPatch: true }, { type: types.SET_LOAD_STATUS_FALSE })).toEqual({
      ...initialState,
      isLoadPatch: false,
    })
  })

  it('Должен вернуть начальное значение при сбросе статуса пароя, SET_INITIAL_RESET_PASSWORD_STATUS', () => {
    expect(
      userReducer({ isAuth: true, userData: { name: 'Vasya' } }, { type: types.SET_INITIAL_RESET_PASSWORD_STATUS })
    ).toEqual(initialState)
  })

  it('Должен вернуть начальное значение при выходе пользователя, REMOVE_USER', () => {
    expect(userReducer({ isAuth: true, userData: { name: 'Vasya' } }, { type: types.REMOVE_USER })).toEqual(
      initialState
    )
  })

  it('Должен вернуть начальное значение при ошибке запроса, SET_USER_REQUEST', () => {
    expect(userReducer({ isAuth: true, userData: { name: 'Vasya' } }, { type: types.SET_USER_REQUEST })).toEqual(
      initialState
    )
  })

  it('Должен вернуть начальное значение при ошибке сервера, SET_USER_ERROR', () => {
    expect(userReducer({ isAuth: true, userData: { name: 'Vasya' } }, { type: types.SET_USER_ERROR })).toEqual(
      initialState
    )
  })
})
