import { TWsActions } from './wsActions'
import { TUserActions } from './userActions'
import { TIngredientsActions } from './ingredientsAction'
import { TCurrentIngredientsActions } from './currentIngredientsActions'
import { TCurrentIngredientActions } from './currentIngredientActions'

export * from './wsActions'
export * from './userActions'
export * from './ingredientsAction'
export * from './currentIngredientsActions'
export * from './currentIngredientActions'

export type TActionsAll =
  | TWsActions
  | TUserActions
  | TIngredientsActions
  | TCurrentIngredientsActions
  | TCurrentIngredientActions