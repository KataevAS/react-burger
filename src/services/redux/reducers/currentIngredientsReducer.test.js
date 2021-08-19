import { currentIngredientsReducer } from './currentIngredientsReducer'
import * as types from '../action-types/currentIngredientsTypes'

describe('currentIngredientsReducer', () => {
  it('Должен вернуть начальный state', () => {
    expect(currentIngredientsReducer(undefined, {})).toEqual({
      bun: null,
      all: [],
      order: null,
    })
  })

  it('Должен корректно ДОБАВЛЯТЬ ингридиент с типом bun по экшену SET_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(undefined, {
        type: types.SET_CURRENT_INGREDIENTS,
        itemType: 'bun',
        price: 123,
        id: '123d',
        name: 'Bun Caban',
        image: 'url',
      })
    ).toEqual({
      bun: { price: 123, id: '123d', name: 'Bun Caban', image: 'url', uniqId: expect.any(String) },
      all: [],
      order: null,
    })
  })

  it('Должен корректно ЗАМЕНЯТЬ ингридиент с типом bun по экшену SET_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: { price: 100, id: '0000', name: 'Bun Caban', image: 'url', uniqId: '1d2d3d' },
          all: [],
          order: null,
        },
        {
          type: types.SET_CURRENT_INGREDIENTS,
          itemType: 'bun',
          price: 123,
          id: '123d',
          name: 'Bun Caban',
          image: 'url',
        }
      )
    ).toEqual({
      bun: { price: 123, id: '123d', name: 'Bun Caban', image: 'url', uniqId: expect.any(String) },
      all: [],
      order: null,
    })
  })

  it('Должен корректно добавлять ПЕРВЫЙ ингридиент с типом НЕ bun по экшену SET_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(undefined, {
        type: types.SET_CURRENT_INGREDIENTS,
        itemType: 'sauce',
        price: 123,
        id: '123d',
        name: 'Sauce for my life',
        image: 'url',
      })
    ).toEqual({
      bun: null,
      all: [{ price: 123, id: '123d', name: 'Sauce for my life', image: 'url', uniqId: expect.any(String) }],
      order: null,
    })
  })

  it('Должен корректно добавлять К СУЩЕСТВУЮЩЕМУ МАССИВУ ингридиент с типом НЕ bun по экшену SET_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: null,
          all: [{ price: 100, id: '0000', name: 'WTF', image: 'url', uniqId: '1d2d3d' }],
          order: null,
        },
        {
          type: types.SET_CURRENT_INGREDIENTS,
          itemType: 'sauce',
          price: 123,
          id: '123d',
          name: 'Sauce for my life',
          image: 'url',
        }
      )
    ).toEqual({
      bun: null,
      all: [
        { price: 100, id: '0000', name: 'WTF', image: 'url', uniqId: '1d2d3d' },
        { price: 123, id: '123d', name: 'Sauce for my life', image: 'url', uniqId: expect.any(String) },
      ],
      order: null,
    })
  })

  it('Должен удалять все ингридиенты по экшену REMOVE_ALL_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: { name: 'bun' },
          all: [{ name: 'sauce' }],
          order: null,
        },
        { type: types.REMOVE_ALL_CURRENT_INGREDIENTS }
      )
    ).toEqual({
      bun: null,
      all: [],
      order: null,
    })
  })

  it('Должен удалить выбранный ингредиент по экшену DELETE_CURRENT_INGREDIENTS', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: { name: 'bun', id: '1', uniqId: '1a' },
          all: [
            { name: 'sauce', id: '2', uniqId: '2a' },
            { name: 'sauce', id: '2', uniqId: '2b' },
            { name: 'main', id: '3', uniqId: '3a' },
          ],
          order: null,
        },
        { type: types.DELETE_CURRENT_INGREDIENTS, uniqId: '2a' }
      )
    ).toEqual({
      bun: { name: 'bun', id: '1', uniqId: '1a' },
      all: [
        { name: 'sauce', id: '2', uniqId: '2b' },
        { name: 'main', id: '3', uniqId: '3a' },
      ],
      order: null,
    })
  })

  it('Успешное получение заказа, SET_ORDER_SUCCESS', () => {
    expect(currentIngredientsReducer(undefined, { type: types.SET_ORDER_SUCCESS, order: 'new order' })).toEqual({
      bun: null,
      all: [],
      order: 'new order',
    })
  })

  it('Должен установить начальное значение для order из-за отрицательного ответа от сервера при запросе заказа, SET_ORDER_REQUEST', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: 'bun',
          all: ['sauce', 'main'],
          order: 'order',
        },
        { type: types.SET_ORDER_REQUEST }
      )
    ).toEqual({
      bun: 'bun',
      all: ['sauce', 'main'],
      order: null,
    })
  })

  it('Должен установить начальное значение для order из-за ошибки запроса к серверу при запросе заказа, SET_ORDER_ERROR', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: 'bun',
          all: ['sauce', 'main'],
          order: 'order',
        },
        { type: types.SET_ORDER_ERROR }
      )
    ).toEqual({
      bun: 'bun',
      all: ['sauce', 'main'],
      order: null,
    })
  })

  it('Должен удалить заказ, REMOVE_ORDER', () => {
    expect(
      currentIngredientsReducer(
        {
          bun: 'bun',
          all: ['sauce', 'main'],
          order: 'order',
        },
        { type: types.REMOVE_ORDER }
      )
    ).toEqual({
      bun: 'bun',
      all: ['sauce', 'main'],
      order: null,
    })
  })

  it('Должен переместить выбранный ингредиент по индексу, CHANGE_CURRENT_ITEM_INDEX', () => {
    expect(
      currentIngredientsReducer(
        {
          all: [{ uniqId: '1' }, { uniqId: '2' }, { uniqId: '3' }],
        },
        { type: types.CHANGE_CURRENT_ITEM_INDEX, id: '1', index: 2 }
      )
    ).toEqual({
      all: [{ uniqId: '2' }, { uniqId: '3' }, { uniqId: '1' }],
    })
  })
})
