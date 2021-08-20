import { wsReducer, initialState } from './wsReducer'
import * as types from '../action-types/wsActionTypes'

describe('wsReducer', () => {
  it('Должен вернуть начальный state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })

  it('Должен изменить флаг wsConnected на true, WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, { type: types.WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('Должен вернуть начальное значение при ошибке установки соединения, WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer({ wsConnected: true, orders: [1, 2, 3], total: 20, totalToday: 2 }, { type: types.WS_CONNECTION_ERROR })
    ).toEqual({
      ...initialState,
    })
  })

  it('Должен вернуть начальное значение при закрытии соединения, WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(
        { wsConnected: true, orders: [1, 2, 3], total: 20, totalToday: 2 },
        { type: types.WS_CONNECTION_CLOSED }
      )
    ).toEqual({
      ...initialState,
    })
  })

  it('Должен вернуть информацию полученного сообщения, WS_GET_MESSAGE', () => {
    expect(
      wsReducer(
        { ...initialState, wsConnected: true },
        {
          type: types.WS_GET_MESSAGE,
          payload: {
            orders: [
              {
                createdAt: '2021-06-23T14:43:22.587Z',
                ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9'],
                name: 'Name one order',
                number: 12345,
                status: 'done',
                updatedAt: '2021-06-23T14:43:22.587Z',
                _id: '1',
              },
              {
                createdAt: '2021-06-23T14:43:22.587Z',
                ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9'],
                name: 'Name two order',
                number: 12345,
                status: 'done',
                updatedAt: '2021-06-23T14:43:22.587Z',
                _id: '2',
              },
            ],
            total: 10,
            totalToday: 1,
          },
        }
      )
    ).toEqual({
      wsConnected: true,
      orders: [
        {
          createdAt: '2021-06-23T14:43:22.587Z',
          ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9'],
          name: 'Name one order',
          number: 12345,
          status: 'done',
          updatedAt: '2021-06-23T14:43:22.587Z',
          id: '1',
        },
        {
          createdAt: '2021-06-23T14:43:22.587Z',
          ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9'],
          name: 'Name two order',
          number: 12345,
          status: 'done',
          updatedAt: '2021-06-23T14:43:22.587Z',
          id: '2',
        },
      ],
      total: 10,
      totalToday: 1,
    })
  })
})
