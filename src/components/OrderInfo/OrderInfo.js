import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/functions/formatDate'
import styles from './OrderInfo.module.css'

export const OrderInfo = ({ type = 'modal' }) => {
  const { id } = useParams()

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
            const price = ing.type === 'bun' ? ing.price * 2 : ing.price
            acc += price
            return acc
          }, 0)
        : 0,
    [order, ingredients]
  )

  const orderIngredients = useMemo(
    () =>
      order &&
      Object.values(
        order.ingredients.reduce((acc, ingId) => {
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

          acc[ingId] = {
            id: ing._id,
            type: ing.type,
            name: ing.name,
            image: ing.image,
            count: ing.type === 'bun' ? 2 : 1,
            price: ing.price,
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
                    <CurrencyIcon />
                  </p>
                </div>
              ))}
          </div>
          <div className={`${styles.totalPrice}`}>
            <p className={`text_color_inactive`}>{formatDate(order.createdAt)}</p>
            <p className={`${styles.price}`}>
              <span className={`mr-2 text_type_digits-default`}>{priceOrder}</span>
              <CurrencyIcon />
            </p>
          </div>
        </>
      )}
    </article>
  )
}

OrderInfo.propTypes = {
  type: PropTypes.string,
}
