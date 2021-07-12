import { combineReducers } from 'redux';
import { nanoid } from 'nanoid';

import {
  SET_INGREDIENTS,
  SET_CURRENT_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  DELETE_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENTS
} from './actions';



const initialIngredients = {
  buns: [],
  sauce: [],
  mains: [],
  requestIngredients: false
};
const initialCurrentIngredients = {
  bun: null,
  all: [],
  order: null
};
const initialCurrentIngredient = null;


const ingredients = (state = initialIngredients, action) => {
  switch (action.type) {


    case SET_INGREDIENTS:
      return ({
        ...state,
        buns: action.ingredients.filter(item => item.type === 'bun'),
        sauce: action.ingredients.filter(item => item.type === 'sauce'),
        mains: action.ingredients.filter(item => item.type === 'main'),
        requestIngredients: false
      });


    default:
      return state;
  }
}

const currentIngredients = (state = initialCurrentIngredients, action) => {

  switch (action.type) {

    case SET_CURRENT_INGREDIENTS:
      const { itemType, price, id, name, image } = action;
      if (itemType === 'bun') {
        return {
          ...state,
          bun: { price, id, name, image, uniqId: nanoid() }
        };
      } else {
        return {
          ...state,
          all: [
            ...state.all,
            { price, id, name, image, uniqId: nanoid() }]

        };
      }

    case DELETE_CURRENT_INGREDIENTS:
      return {
        ...state,
        all: state.all.filter(item => item.uniqId !== action.uniqId)
      }

    case SET_ORDER:
      return ({
        ...state,
        order: action.order
      })



    default:
      return state;
  }
}


const currentIngredient = (state = initialCurrentIngredient, action) => {
  switch (action.type) {


    case SET_CURRENT_INGREDIENT:
      return action.ingredient;


    case DELETE_CURRENT_INGREDIENT:
      return null;


    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  ingredients,
  currentIngredients,
  currentIngredient
});