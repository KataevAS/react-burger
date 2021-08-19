import { ingredientsReducer } from './ingredientsReducer'
import * as types from '../action-types/ingredientsActionTypes'

describe('ingredientsReducer', () => {
  it('Должен вернуть начальный state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      buns: [],
      sauce: [],
      mains: [],
      requestIngredients: false,
    })
  })

  it('Должен корректно добавить ингредиенты, SET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(
        {
          buns: [{ type: 'bun', name: '11' }],
          sauce: [{ type: 'sauce', name: '12' }],
          mains: [{ type: 'main', name: '13' }],
          requestIngredients: false,
        },
        {
          type: types.SET_INGREDIENTS_SUCCESS,
          ingredients: [
            { type: 'bun', name: '1' },
            { type: 'bun', name: '2' },
            { type: 'sauce', name: '3' },
            { type: 'bun', name: '4' },
            { type: 'sauce', name: '5' },
            { type: 'main', name: '6' },
            { type: 'main', name: '7' },
            { type: 'sauce', name: '8' },
            { type: 'main', name: '9' },
            { type: 'sauce', name: '10' },
          ],
        }
      )
    ).toEqual({
      buns: [
        { type: 'bun', name: '1' },
        { type: 'bun', name: '2' },
        { type: 'bun', name: '4' },
      ],
      sauce: [
        { type: 'sauce', name: '3' },
        { type: 'sauce', name: '5' },
        { type: 'sauce', name: '8' },
        { type: 'sauce', name: '10' },
      ],
      mains: [
        { type: 'main', name: '6' },
        { type: 'main', name: '7' },
        { type: 'main', name: '9' },
      ],
      requestIngredients: false,
    })
  })

  it('Должен установить начальное значение из-за отрицательного ответа от сервера при запросе ингредиентов, SET_INGREDIENTS_REQUEST', () => {
    expect(
      ingredientsReducer(
        {
          buns: [{ type: 'bun', name: '11' }],
          sauce: [{ type: 'sauce', name: '12' }],
          mains: [{ type: 'main', name: '13' }],
          requestIngredients: false,
        },
        { type: types.SET_INGREDIENTS_REQUEST }
      )
    ).toEqual({
      buns: [],
      sauce: [],
      mains: [],
      requestIngredients: false,
    })
  })

  it('Должен установить начальное значение из-за ошибки запроса к серверу при запросе ингредиентов, SET_INGREDIENTS_ERROR', () => {
    expect(
      ingredientsReducer(
        {
          buns: [{ type: 'bun', name: '11' }],
          sauce: [{ type: 'sauce', name: '12' }],
          mains: [{ type: 'main', name: '13' }],
          requestIngredients: false,
        },
        { type: types.SET_INGREDIENTS_REQUEST }
      )
    ).toEqual({
      buns: [],
      sauce: [],
      mains: [],
      requestIngredients: false,
    })
  })
})
