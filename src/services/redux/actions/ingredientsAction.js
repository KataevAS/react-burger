import { SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_ERROR, SET_INGREDIENTS_REQUEST } from '../action-types'

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

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
