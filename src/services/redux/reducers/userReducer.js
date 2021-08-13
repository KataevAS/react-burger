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

const initialState = {
  isAuth: false,
  isSentEmail: false,
  isResetPassword: false,
  isLoadPatch: false,
  userData: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, isAuth: true, userData: action.user }

    case SET_SENT_EMAIL_FORGOT_PASSWORD:
      return { ...state, isSentEmail: true }

    case SET_RESET_PASSWORD_STATUS:
      return { ...state, isResetPassword: true }

    case CHANGE_USER_DATA:
      return {
        ...state,
        userData: {
          name: action.user.name ? action.user.name : state.userData.name,
          email: action.user.email ? action.user.email : state.userData.email,
        },
      }

    case SET_LOAD_STATUS_TRUE:
      return { ...state, isLoadPatch: true }

    case SET_LOAD_STATUS_FALSE:
      return { ...state, isLoadPatch: false }

    case SET_INITIAL_RESET_PASSWORD_STATUS:
      return initialState

    case REMOVE_USER:
      return initialState

    case SET_USER_REQUEST:
      return initialState

    case SET_USER_ERROR:
      return initialState

    default:
      return state
  }
}
