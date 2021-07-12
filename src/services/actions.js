export const SET_INGREDIENTS = 'SET_INGREDIENTS',
  SET_CURRENT_INGREDIENTS = 'SET_CURRENT_INGREDIENTS',
  SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT',
  SET_ORDER = 'SET_ORDER',
  DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT',
  DELETE_CURRENT_INGREDIENTS = 'DELETE_CURRENT_INGREDIENTS';


const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders';


export const getIngredients = () => dispatch => {

  const getData = async () => {
    try {
      const res = await fetch(URL_INGREDIENTS);
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status);
      }
      const data = await res.json();
      dispatch({
        type: SET_INGREDIENTS,
        ingredients: data.data
      });
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message);
    }
  }

  getData();
}

export const setCurrentIngredient = (ingredient) => dispatch => {
  dispatch({
    type: SET_CURRENT_INGREDIENT,
    ingredient
  })
}

export const deleteCurrentIngredient = () => dispatch => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENT
  })
}

export const setCurrentIngredients = (itemType, price, id, name, image) => dispatch => {
  dispatch({
    type: SET_CURRENT_INGREDIENTS,
    itemType,
    price,
    id,
    name,
    image
  })
}

export const deleteCurrentIngredients = (uniqId) => dispatch => {
  dispatch({
    type: DELETE_CURRENT_INGREDIENTS,
    uniqId
  })
}



export const getOrder = (currentIngredients) => dispatch => {

  const getOrderData = async () => {
    try {
      const res = await fetch(URL_GET_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ingredients: currentIngredients
        })
      });
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status);
      }
      const data = await res.json();

      dispatch({ type: SET_ORDER, order: data.order.number });

    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message);
    }
  }
  getOrderData();
}