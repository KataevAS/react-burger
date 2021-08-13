import { combineReducers } from 'redux'
import { currentIngredientReducer } from './currentIngredientReducer'
import { currentIngredientsReducer } from './currentIngredientsReducer'
import { ingredientsReducer } from './ingredientsReducer'
import { userReducer } from './userReducer'
import { wsReducer } from './wsReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  currentIngredients: currentIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  onlineOrders: wsReducer,
})
