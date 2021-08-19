import { currentIngredientReducer } from './currentIngredientReducer'
import * as types from '../action-types/currentIngredientTypes'

describe('todos reducer', () => {
  it('Должен вернуть начальный state', () => {
    expect(currentIngredientReducer(undefined, {})).toEqual(null)
  })

  it('Должен корректно добавлять ингредиент по экшену SET_CURRENT_INGREDIENT', () => {
    expect(
      currentIngredientReducer([], {
        type: types.SET_CURRENT_INGREDIENT,
        ingredient: {
          _id: '123d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        },
      })
    ).toEqual({
      _id: '123d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    })
  })

  it('Должен заменить выбранный ингредиент на начальное значение по экшену DELETE_CURRENT_INGREDIENT', () => {
    expect(
      currentIngredientReducer(
        {
          _id: '123d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        },
        { type: types.DELETE_CURRENT_INGREDIENT }
      )
    ).toEqual(null)
  })
})
