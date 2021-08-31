import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../utils/functions/formatDate'
import styles from './OrderInfo.module.css'
import { useSelector } from '../../utils/typedHooks'

interface IOrderInfoProps {
  type: string
}

interface IOrderIngredient {
  id: string
  type: string
  name: string
  image: string
  count: number
  price: number
}

interface LooseObject {
  [key: string]: IOrderIngredient
}

export const OrderInfo: FC<IOrderInfoProps> = ({ type = 'modal' }) => {
  const { id } = useParams<{ id?: string }>()

  const orders = useSelector((store) => store.onlineOrders.orders)

  const order = orders.find((item) => item.id === id)

  const buns = useSelector((store) => store.ingredients.buns)
  const sauce = useSelector((store) => store.ingredients.sauce)
  const mains = useSelector((store) => store.ingredients.mains)

  const ingredients = useMemo(() => [...buns, ...sauce, ...mains], [buns, sauce, mains])

  const status =
    (order?.status === 'done' && 'Выполнен') ||
    (order?.status === 'created' && 'Создан') ||
    (order?.status === 'pending' && 'Отменен') ||
    ''

  const priceOrder = useMemo(
    () =>
      order
        ? order.ingredients.reduce((acc, item) => {
            const ing = ingredients.find((ing) => ing._id === item)
            if (ing) {
              const price = ing.type === 'bun' ? ing.price * 2 : ing.price
              acc += price
              return acc
            }
            return acc
          }, 0)
        : 0,
    [order, ingredients]
  )

  const orderIngredients = useMemo(
    () =>
      order &&
      Object.values(
        order.ingredients.reduce((acc: LooseObject, ingId) => {
          if (ingredients.length === 0) {
            return acc
          }

          if (acc[ingId]) {
            acc[ingId].type === 'bun'
              ? (acc[ingId].count = acc[ingId].count + 2)
              : (acc[ingId].count = acc[ingId].count + 1)
            return acc
          }

          const ing = ingredients.find((ing) => ing._id === ingId)

          if (ing) {
            acc[ingId] = {
              id: ing._id,
              type: ing.type,
              name: ing.name,
              image: ing.image,
              count: ing.type === 'bun' ? 2 : 1,
              price: ing.price,
            }
          }

          return acc
        }, {})
      ),
    [order, ingredients]
  )

  return (
    <article className={`${styles.OrderInfo} text text_type_main-default mt-15`}>
      {order && (
        <>
          <p className={`${type === 'page' && styles.titleForPage} text_type_digits-default`}>{'#' + order.number}</p>
          <h2 className={`text_type_main-medium mt-10`}>{order.name}</h2>
          <p className={`${styles.statusText} text_type_main-default mt-3`}>{status}</p>
          <h2 className={`mt-10`}>Состав:</h2>
          <div className={`${styles.cards} mt-6 pr-6 mb-10`}>
            {orderIngredients &&
              orderIngredients.map((ing) => (
                <div key={ing.id} className={`${styles.card} mb-4`}>
                  <img className={`${styles.cardImg} mr-4`} src={ing.image} alt='img' />
                  <p className={`mr-4`}>{ing.name}</p>
                  <p className={`${styles.price}`}>
                    <span className={`mr-2 text_type_digits-default`}>{`${ing.count} x ${ing.price}`}</span>
                    <CurrencyIcon type='primary' />
                  </p>
                </div>
              ))}
          </div>
          <div className={`${styles.totalPrice}`}>
            <p className={`text_color_inactive`}>{formatDate(order.createdAt)}</p>
            <p className={`${styles.price}`}>
              <span className={`mr-2 text_type_digits-default`}>{priceOrder}</span>
              <CurrencyIcon type='primary' />
            </p>
          </div>
        </>
      )}
    </article>
  )
}
